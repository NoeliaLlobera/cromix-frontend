import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GrowlState} from './growl.reducer';

export const selectGrowlState = createFeatureSelector<GrowlState>('growl');

export const selectGrowlMessage = createSelector(
  selectGrowlState,
  (state) => state.message
);

export const selectGrowlMessageType = createSelector(
  selectGrowlState,
  (state) => state.messageType
);
