import { Card } from '@wwc/core';

export interface ArtistState {
  loadingMyDesigns: boolean;
  myDesigns: Card[];
  firestoreUnsubscribeMethods: Function[];
  savingActiveCard: boolean;
  activeCardLastSavedDate?: Date;
}
