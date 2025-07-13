import {CollectionDTO} from "../../core/models/collectionDTO";
import {createReducer, on} from "@ngrx/store";
import {
  createCollection, createCollectionFailure,
  createCollectionSuccess, deleteCollection, deleteCollectionFailure, deleteCollectionSuccess,
  loadCollections,
  loadCollectionsFailure,
  loadCollectionsSuccess
} from "./collections.actions";

export interface CollectionsState {
  isLoading: boolean;
  error: string | null;
  collections: CollectionDTO[];
}

export const initialCollectionsState: CollectionsState = {
  isLoading: false,
  error: null,
  collections: []
};

export const collectionsReducer = createReducer(
  initialCollectionsState,
  on(loadCollections, (state) => {
    return {
      ...state,
      isLoading: true,
      error: null
    }
  }),
  on(loadCollectionsSuccess, (state, {collections}) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        collections: collections
      }
    }
  ),
  on(loadCollectionsFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        error: error
      }
    )
  ),
  on(createCollection, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    },
  ),
  on(createCollectionSuccess, (state, {collections}) => {
      return {
        ...state,
        isLoading: false,
        error: null,
        collections: collections
      }
    }
  ),
  on(createCollectionFailure, (state, {error}) => {
    return {
      ...state,
      isLoading: false,
      error: error
    }
  }),
  on(deleteCollection, (state) => {
      return {
        ...state,
        isLoading: true,
        error: null
      }
    },
  ),
  on(deleteCollectionSuccess, (state, {collections}) => {
    return {
      ...state,
      isLoading: false,
      error: null,
      collections: collections
    }
  }),
  on(deleteCollectionFailure, (state, {error}) => {
    return {
      ...state,
      isLoading: false,
      error: error
    }
  })
);
