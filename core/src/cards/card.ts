import { Page } from '..';
import { Entity } from '../shared/entity';
import { UserInfo } from 'firebase';

export class Card implements Entity {
  id?: string;
  pages: Page[];
  userId: string;
  userInfo: UserInfo;
}
