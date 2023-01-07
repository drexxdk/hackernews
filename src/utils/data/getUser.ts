import { User } from '@interfaces/user';
import { getRequest } from '@utils/api';

const getUser = async (id: string): Promise<User | undefined> => {
  return getRequest<User | undefined>(process.env.NEXT_PUBLIC_API_ROOT, `user/${id}.json`);
};

export default getUser;
