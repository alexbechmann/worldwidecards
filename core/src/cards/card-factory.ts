import { Card } from './card';
import { TextShape } from './text-shape';
import { ImageShape } from './image-shape';
import { constants } from '../shared/contants';

export class CardFactory {
  createBlankPortraitCard() {
    return new Card([
      {
        height: constants.card.dimensions.portrait.height,
        width: constants.card.dimensions.portrait.width,
        shapes: [
          new TextShape({
            x: 25,
            y: 25,
            text: 'Test text alskdjf lkasjdf lkasjdf lkajsdf klasjdf klajskldf jaskldf jaklsfd ',
            fontSize: 24,
            width: 300,
            color: 'blue'
          }),
          new ImageShape({
            href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg',
            x: 5,
            y: 5,
            width: 30,
            height: 30
          }),
          new ImageShape({
            href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg',
            x: constants.card.dimensions.portrait.width - 35,
            y: 5,
            width: 30,
            height: 30
          }),
          new ImageShape({
            href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg',
            x: 5,
            y: constants.card.dimensions.portrait.height - 35,
            width: 30,
            height: 30
          }),
          new ImageShape({
            href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg',
            x: constants.card.dimensions.portrait.width - 35,
            y: constants.card.dimensions.portrait.height - 35,
            width: 30,
            height: 30
          }),
          new ImageShape({
            href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg',
            x: 0,
            y: 65,
            width: constants.card.dimensions.portrait.width,
            height: 300
          }),
          new TextShape({
            x: 15,
            y: 330,
            text: 'Bottom text',
            fontSize: 24,
            color: 'yellow'
          })
        ]
      },
      {
        height: constants.card.dimensions.portrait.height,
        width: constants.card.dimensions.portrait.width,
        shapes: [
          new TextShape({
            x: 25,
            y: 25,
            text: 'Inner left',
            fontSize: 24
          })
        ]
      },
      {
        height: constants.card.dimensions.portrait.height,
        width: constants.card.dimensions.portrait.width,
        shapes: [
          new TextShape({
            x: 25,
            y: 25,
            text: 'Inner right',
            fontSize: 24
          })
        ]
      },
      {
        height: constants.card.dimensions.portrait.height,
        width: constants.card.dimensions.portrait.width,
        shapes: [
          new TextShape({
            x: 25,
            y: 25,
            text: 'Back',
            fontSize: 24
          })
        ]
      }
    ]);
  }
}

export const cardFactory = new CardFactory();
