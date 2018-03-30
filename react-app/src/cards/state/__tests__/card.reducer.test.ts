import { cardReducer } from '../card.reducer';
import { addTextShape, updateShapePosition } from '../card.actions';
import { constants } from '@wwc/core';
import { CardState } from '../card.state';

const defaultState: CardState = {
  myDesigns: [],
  savingActiveCard: false,
  activeCard: {
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
              href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg'
            },
            x: 0,
            y: 200,
            width: constants.card.dimensions.portrait.width,
            height: 300
          }
        ]
      }
    ]
  }
};

it('Add text', () => {
  const action = addTextShape(0, 'test1');
  const state = cardReducer(defaultState, action);
  expect(state.activeCard!.pages[0].shapes[3].textData!.text).toEqual('test1');
});

it('Update shape position', () => {
  const action = updateShapePosition(0, 1, 49, 33);
  const state = cardReducer(defaultState, action);
  expect(state.activeCard!.pages[0].shapes[1].x).toEqual(49);
  expect(state.activeCard!.pages[0].shapes[1].y).toEqual(33);
});

it('t', () => {
  expect('a').toEqual('a');
});
