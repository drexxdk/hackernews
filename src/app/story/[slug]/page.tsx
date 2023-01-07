import H1 from '@components/H1';
import H2 from '@components/H2';
import TextLink from '@components/TextLink';
import getStory from '@utils/data/getStory';

type Props = {
  params: {
    slug: string;
  };
};

const StoryPage = async (props: Props) => {
  const slug = parseInt(props.params.slug);
  const story = isNaN(slug) ? undefined : await getStory(slug);
  return (
    <>
      {story ? (
        <>
          <H1>{story.title}</H1>
          {story.url ? (
            <label>
              Link to real story:
              <TextLink href={story.url}>{story.url}</TextLink>
            </label>
          ) : null}
          {/** TODO: add comment comment that uses these ids */}
          <H2>Comments</H2>
          {story.kids.length ? <label>{story.kids.map((id) => id).join(', ')}</label> : <p>No comments</p>}
        </>
      ) : (
        <p>Story not found</p>
      )}
    </>
  );
};

export default StoryPage;
