import { artistDesignerReducer } from '../customer-designer.reducer';
import { addTextShape, updateShapePosition } from '../customer-designer.actions';
import { constants } from '@wwc/core';
import { CustomerDesignerState } from '../customer-designer.state';

const defaultState: CustomerDesignerState = {
  activePageIndex: 0,
  activeCard: {
    userId: 'A3KDFSDFL',
    userInfo: {
      displayName: '',
      email: '',
      phoneNumber: '',
      photoURL: '',
      providerId: '',
      uid: ''
    },
    pages: [
      {
        height: constants.card.dimensions.portrait.height,
        width: constants.card.dimensions.portrait.width,
        shapes: [
          {
            type: constants.shapes.types.text,
            allowUserEdit: true,
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
            allowUserEdit: true,
            imageData: {
              href: 'https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/182198.jpg'
            },
            x: 0,
            y: 200,
            width: constants.card.dimensions.portrait.width
          }
        ]
      }
    ]
  }
};

it('Add text', () => {
  const action = addTextShape({ pageIndex: 0, text: 'test1' });
  const state = artistDesignerReducer(defaultState, action);
  expect(state.activeCard!.pages[0].shapes[2].textData!.text).toEqual('test1');
});

it('Update shape position', () => {
  const action = updateShapePosition({
    pageIndex: 0,
    shapeIndex: 1,
    x: 49,
    y: 33
  });
  const state = artistDesignerReducer(defaultState, action);
  expect(state.activeCard!.pages[0].shapes[1].x).toEqual(49);
  expect(state.activeCard!.pages[0].shapes[1].y).toEqual(33);
});