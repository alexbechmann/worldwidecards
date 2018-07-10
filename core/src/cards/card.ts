import { Page } from '..';
import { Entity } from '../shared/entity';
import { UserInfo } from 'firebase';

export interface Card extends Entity {
  id?: string;
  pages: Page[];
  userId: string;
  userInfo: UserInfo;
}
