import { Story, StoryWithImage } from '@interfaces/story';
import getStories from '@utils/data/getStories';
import getStory from '@utils/data/getStory';
import { randomNumberBetween } from '@utils/randomNumberBetween';
import Image from 'next/image';
import Link from 'next/link';
import H1 from './H1';

const getData = async (): Promise<StoryWithImage[]> => {
  const ids = await getStories();
  const stories: StoryWithImage[] = [];

  if (ids?.length) {
    /**
     * There is no endpoint to get multiple items in the same call,
     * so we need to make api call for each item
     *  */
    const promises: Promise<Story | undefined>[] = [];

    /**
     * Assignment requires 10 random elements.
     * This shuffles the ids
     */
    const shuffledIds = ids.sort(() => 0.5 - Math.random());

    /** Assignment requires 10 elements */
    shuffledIds.slice(0, 10).forEach(async (id) => {
      promises.push(getStory(id));
    });

    /** Promise.all combines the result of all the api calls */
    await Promise.all(promises).then((data) => {
      data.forEach((item) => {
        if (item) {
          /**
           * Api data doesn't contain image for the stories,
           * so I add a random image to each
           */
          const storyWithImage: StoryWithImage = {
            ...item,
            image: `/assets/stories/${randomNumberBetween(1, 5)}.jpg`,
          };
          stories.push(storyWithImage);
        }
      });
    });
  }

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
                  <h3 className="font-bold">{story.title}</h3>
                  <label className="flex items-center gap-2">
                    Score:{' '}
                    <span className="rounded-full bg-orange-600 px-3 py-1 font-bold text-white">{story.score}</span>
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
