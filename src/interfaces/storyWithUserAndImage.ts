import { Story } from './story';
import { User } from './user';

export interface StoryWithUserAndImage extends Story {
  image: string;
  user?: User;
}
