import { Story } from '@interfaces/story';
import getStories from '@utils/data/getStories';
import getStory from '@utils/data/getStory';

const getData = async (): Promise<Story[]> => {
  const ids = await getStories();

  const promises: Promise<Story | undefined>[] = [];

  ids?.slice(0, 20).forEach(async (id) => {
    promises.push(getStory(id));
  });

  const stories: Story[] = [];

  await Promise.all(promises).then((data) => {
    data.forEach((item) => (item ? stories.push(item) : null));
  });

  return stories;
};

const Stories = async () => {
  const stories = await getData();

  return (
    <>
      {stories.length ? (
        <ul>
          {stories.map((story, i) => (
            <li key={i}>
              <label>{story.id}</label>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default Stories;
