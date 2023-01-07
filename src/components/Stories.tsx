import { Story } from '@interfaces/story';
import { StoryWithUserAndImage } from '@interfaces/storyWithUserAndImage';
import { User } from '@interfaces/user';
import getStories from '@utils/data/getStories';
import getStory from '@utils/data/getStory';
import getUser from '@utils/data/getUser';
import randomNumberBetween from '@utils/randomNumberBetween';
import Image from 'next/image';
import Link from 'next/link';
import H1 from './H1';

const getData = async (): Promise<StoryWithUserAndImage[]> => {
  const ids = await getStories();

  let stories: StoryWithUserAndImage[] = [];

  if (ids?.length) {
    /**
     * getStories() only contains ids, so we need to make additional api calls to get remaining data.
     * There is no endpoint to get multiple stories in the same call,
     * so we need to make api call for each story
     *  */
    const StoryPromises: Promise<Story | undefined>[] = [];

    /**
     * Assignment requires 10 random elements.
     * This shuffles the ids
     */
    const shuffledIds = ids.sort(() => 0.5 - Math.random());

    /** Assignment requires 10 elements */
    shuffledIds.slice(0, 10).forEach(async (id) => {
      StoryPromises.push(getStory(id));
      StoryPromises.push(getStory(id));
    });

    /** Promise.all combines the result of all the api calls */
    await Promise.all(StoryPromises).then((data) => {
      data.forEach((item) => {
        if (item) {
          /**
           * Api data doesn't contain image for the stories,
           * so I add a random image to each
           */
          const storyWithUserAndImage: StoryWithUserAndImage = {
            ...item,
            image: `/assets/stories/${randomNumberBetween(1, 5)}.jpg`,
          };

          stories.push(storyWithUserAndImage);
        }
      });
    });

    /**
     * getStory() only contains by (id), so we need to make additional api calls to get remaining data.
     * There is no endpoint to get multiple users in the same call,
     * so we need to make api call for each user
     *  */
    const UserPromises: Promise<User | undefined>[] = [];

    /**
     * 1. get by (id)
     * 2. remove dublicates
     * 3. make get request
     */
    stories
      .map((story) => story.by)
      .filter((v, i, a) => a.indexOf(v) === i)
      .forEach((id) => {
        UserPromises.push(getUser(id));
      });

    /** Promise.all combines the result of all the user promise api calls */
    await Promise.all(UserPromises).then((users) => {
      stories = stories.map((story) => {
        return { ...story, user: users.find((user) => user?.id === story.by) };
      });
    });
  }

  /** return stories sorted by score where highest score is first */
  return stories.sort((a, b) => b.score - a.score);
};

const Stories = async () => {
  const stories = await getData();

  return (
    <>
      <H1>Stories</H1>
      {stories.length ? (
        <ul className="grid gap-4 @container @xs:grid-cols-2">
          {stories.map((story, i) => (
            <li key={i} className="grid">
              <Link
                href={`/story/${story.id}`}
                className="overflow-hidden rounded-lg border border-gray-700 bg-gray-600 text-white hover:bg-gray-400 @xs:flex"
              >
                <div className="relative aspect-16/9 shrink-0 @xs:w-1/4">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill={true}
                    sizes="(max-width: 539px) 600px,
              (min-width: 640px) 95px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="grid gap-1 p-3">
                  <h2 className="font-bold">
                    <u>{story.title}</u>
                  </h2>
                  {story.user ? (
                    <>
                      <label>
                        <b>User:</b>: {story.user.id}
                      </label>
                      <label>
                        <b>Karma</b>: {story.user.karma}
                      </label>
                    </>
                  ) : null}
                  <label className="flex items-center gap-2">
                    Score:{' '}
                    <span className="rounded-full bg-orange-700 px-3 py-1 font-bold text-white">{story.score}</span>
                  </label>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stories to show</p>
      )}
    </>
  );
};

export default Stories;
