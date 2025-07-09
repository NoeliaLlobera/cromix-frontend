import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GrowlState} from "./growl.reducers";

export const selectGrowlState = createFeatureSelector<GrowlState>('growl');
export const selectGrowlMessage = createSelector(
  selectGrowlState,
  (state: GrowlState) => state.message
);
export const selectGrowlType = createSelector(
  selectGrowlState,
  (state: GrowlState) => state.type
);
