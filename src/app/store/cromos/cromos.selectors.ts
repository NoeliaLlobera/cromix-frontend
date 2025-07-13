// import {createFeatureSelector, createSelector} from "@ngrx/store";
// import {CollectionsState} from "./collections.reducers";
//
// export const selectCollectionsState = createFeatureSelector<CollectionsState>('collections');
//
// export const selectIsLoading = createSelector(
//   selectCollectionsState,
//   (state: CollectionsState) => state.isLoading
// );
//
// export const selectCollections = createSelector(
//   selectCollectionsState,
//   (state: CollectionsState) => {
//     console.log(state);
//     return state?.collections ?? []
//   }
// );
//
// export const selectCollectionsError = createSelector(
//   selectCollectionsState,
//   (state: CollectionsState) => state.error
// );


import {CromosState} from "./cromos.reducers";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectCromosState = createFeatureSelector<CromosState>('cromos');

export const selectIsCromosLoading = createSelector(
  selectCromosState,
  (state: CromosState) => state.isLoading
);

export const selectCollectionInfo = createSelector(
  selectCromosState,
  (state: CromosState) => state.collection
);

export const selectCromosError = createSelector(
  selectCromosState,
  (state: CromosState) => state.error
);

export const selectCromoTupes = createSelector(
  selectCromosState,
  (state: CromosState) => state.cromo_types
);

