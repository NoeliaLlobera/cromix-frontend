import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CollectionsState} from "./collections.reducers";

export const selectCollectionsState = createFeatureSelector<CollectionsState>('collections');

export const selectIsLoading = createSelector(
  selectCollectionsState,
  (state: CollectionsState) => state.isLoading
);

export const selectCollections = createSelector(
  selectCollectionsState,
  (state: CollectionsState) => {
    console.log(state);
    return state?.collections ?? []
  }
);

export const selectCollectionsError = createSelector(
  selectCollectionsState,
  (state: CollectionsState) => state.error
);
