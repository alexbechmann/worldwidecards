import * as deepFreeze from 'deep-freeze';

const a4 = {
  width: 595,
  height: 842
}

export const constants = deepFreeze({
  card: {
    dimensions: {
      portrait: {
        width: a4.height / 2,
        height: a4.width
      }
    }
  }
})