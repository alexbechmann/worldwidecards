import { FrontPage } from './front-page';
import { Page } from '..';
import { Entity } from '../shared/entity';

export class Card implements Entity {
  id?: string;
  title: string;
  pages: Page[];
  constructor(pages: Page[]) {
    this.pages = pages;
  }

  frontPage() {
    return this.pages[Card.frontPageIndex()];
  }

  static frontPageIndex() {
    return 0;
  }

  innerLeftPage() {
    return this.pages[Card.innerLeftPageIndex()];
  }

  static innerLeftPageIndex() {
    return 1;
  }

  innerRightPage() {
    return this.pages[Card.innerRightPageIndex()];
  }

  static innerRightPageIndex() {
    return 2;
  }

  backPage() {
    return this.pages[Card.backPageIndex()];
  }

  static backPageIndex() {
    return 3;
  }
}
