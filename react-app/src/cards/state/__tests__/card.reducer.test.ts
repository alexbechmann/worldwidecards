// import { cardReducer } from '../card.reducer';
// import { addTextShape } from '../card.actions';
// import { Card, TextShape, ImageShape } from '@wwc/core';
// import { CardState } from '../card.state';

// const defaultState: CardState = {
//   activeCard: new Card([
//     {
//       shapes: [
//         new TextShape({
//           x: 25,
//           y: 25,
//           text: 'Test text',
//           fontSize: 24
//         }),
//         new ImageShape({
//           href: 'http://konvajs.github.io/assets/yoda.jpg',
//           x: 45,
//           y: 65
//         }),
//         new TextShape({
//           x: 25,
//           y: 400,
//           text: 'Bottom text',
//           fontSize: 24
//         })
//       ]
//     }
//   ])
// };

// it('Add text', () => {
//   const action = addTextShape(Card.frontPageIndex(), 'test1');
//   const state = cardReducer(defaultState, action);
//   expect((state.activeCard.pages[0].shapes[3] as TextShape).text).toEqual('test1');
// });

// it('Update shape position', () => {
//   const action = updateShapePosition(Card.frontPageIndex(), 1, {
//     x: 49,
//     y: 33
//   });
//   const state = cardReducer(defaultState, action);
//   expect(state.activeCard.pages[0].shapes[1].x).toEqual(49);
//   expect(state.activeCard.pages[0].shapes[1].y).toEqual(33);
// });
