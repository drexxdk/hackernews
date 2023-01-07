import { Story } from "@interfaces/story";
import { getRequest } from "@utils/api";

const getStory = async (id: number): Promise<Story | undefined> => {
  return getRequest<Story | undefined>(
    process.env.NEXT_PUBLIC_API_ROOT,
    `item/${id}.json`
  );
};

export default getStory;
