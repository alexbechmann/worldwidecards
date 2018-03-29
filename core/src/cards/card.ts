import { Page } from '..';
import { Entity } from '../shared/entity';

export class Card implements Entity {
  id?: string;
  pages: Page[];  
}