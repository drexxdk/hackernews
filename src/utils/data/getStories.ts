import { getRequest } from "@utils/api";

const getStories = async () => {
  return await getRequest<number[]>(
    process.env.NEXT_PUBLIC_API_ROOT,
    "topstories.json"
  );
};
export default getStories;
