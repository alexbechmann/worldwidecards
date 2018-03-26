import { cardReducer } from '../card.reducer';
import { addTextShape, updateShapePosition } from '../card.actions';
import { Card, TextShape, ImageShape } from '@wwc/core';
import { CardState } from '../';

it('Add text', () => {
  const defaultState: CardState = {
    activeCard: new Card([
      {
        shapes: [
          new TextShape('Test text', '', 24, {
            x: 25,
            y: 25
          }),
          new ImageShape('http://konvajs.github.io/assets/yoda.jpg', {
            x: 45,
            y: 65
          }),
          new TextShape('Bottom text', '', 24, {
            x: 25,
            y: 400
          })
        ]
      }
    ])
  };

  const action = addTextShape(Card.frontPageIndex(), 'test1');
  const state = cardReducer(defaultState, action);
  expect((state.activeCard.pages[0].shapes[3] as TextShape).text).toEqual('test1');
});

it('Update shape position', () => {
  const defaultState: CardState = {
    activeCard: new Card([
      {
        shapes: [
          new TextShape('Test text', '', 24, {
            x: 25,
            y: 25
          }),
          new ImageShape('http://konvajs.github.io/assets/yoda.jpg', {
            x: 45,
            y: 65
          }),
          new TextShape('Bottom text', '', 24, {
            x: 25,
            y: 400
          })
        ]
      }
    ])
  };

  const action = updateShapePosition(Card.frontPageIndex(), 1, {
    x: 49,
    y: 33
  });
  const state = cardReducer(defaultState, action);
  expect(state.activeCard.pages[0].shapes[1].position.x).toEqual(49);
  expect(state.activeCard.pages[0].shapes[1].position.y).toEqual(33);
});
