import { Card } from './card';
import { constants } from '../shared/contants';
import { UserInfo } from 'firebase';

export class CardFactory {
  createBlankPortraitCard(userInfo: UserInfo): Card {
    return {
      userId: userInfo.uid,
      userInfo,
      pages: [
        {
          height: constants.card.dimensions.portrait.height,
          width: constants.card.dimensions.portrait.width,
          shapes: [
            {
              type: constants.shapes.types.text,
              x: 25,
              y: 25,
              width: constants.card.dimensions.portrait.width - 50,
              textData: {
                text: 'Happy Birthday!!',
                fontSize: 45,
                color: 'red',
                font: ''
              },
              allowUserEdit: false
            },
            {
              type: constants.shapes.types.image,
              allowUserEdit: false,
              imageData: {
                href: `https://picsum.photos/1000/600?image=${((Math.random() * 1000) | 0) + 1}`,
                ratio: {
                  width: 16,
                  height: 13
                }
              },
              x: 0,
              y: 120,
              width: constants.card.dimensions.portrait.width
            }
          ]
        }
      ]
    };
  }
}

export const cardFactory = new CardFactory();
