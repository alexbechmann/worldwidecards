import * as functions from 'firebase-functions';
import { mathHelper } from '@wwc/core';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send(`Hello from Firebase! - Percent change from 103 -> 130:  ${mathHelper.getPercentageChange(103, 130)}`);
});
