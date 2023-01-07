import getStory from "@utils/data/getStory";

type Props = {
  params: {
    slug: string;
  };
};

const StoryPage = async (props: Props) => {
  const slug = parseInt(props.params.slug);
  const story = isNaN(slug) ? undefined : await getStory(slug);
  return <>{story ? <div>StoryPage {story.title}</div> : "Story not found"} </>;
};

export default StoryPage;
