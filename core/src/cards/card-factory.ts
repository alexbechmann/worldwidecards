import { Card } from './card';
import { TextShape } from './shapes/text-shape';
import { ImageShape } from './shapes/image-shape';
import { constants } from '../shared/contants';

export class CardFactory {
  createBlankPortraitCard(): Card {
    return {
      pages: [
        {
          height: constants.card.dimensions.portrait.height,
          width: constants.card.dimensions.portrait.width,
          shapes: [
            {
              type: constants.shapes.types.text,
              x: 25,
              y: 25,
              width: 300,
              textData: {
                text: 'Test text alskdjf lkasjdf lkasjdf lkajsdf klasjdf klajskldf jaskldf jaklsfd ',
                fontSize: 24,
                color: 'blue',
                font: ''
              }
            },
            {
              type: constants.shapes.types.image,
              imageData: {
                href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg',
              },
              x: constants.card.dimensions.portrait.width - 35,
              y: 5,
              width: 30,
              height: 30
            }
          ]
        }
      ]
    };
  }
}

export const cardFactory = new CardFactory();
