import {createAction, props} from "@ngrx/store";
import {CollectionDTO} from "../../core/models/collectionDTO";

export const loadCollections = createAction(
  '[Collections API] Load Collections',
);

export const loadCollectionsSuccess = createAction(
  '[Collections API] Load Collections Success',
  props<{ collections: CollectionDTO[] }>()
);

export const loadCollectionsFailure = createAction(
  '[Collections API] Load Collections Failure',
  props<{ error: string }>()
);

export const createCollection = createAction(
  '[Collections API] Create Collection',
  props<{ collection: CollectionDTO }>()
);

export const createCollectionSuccess = createAction(
  '[Collections API] Create Collection Success',
  props<{ collections: CollectionDTO[] }>()
);

export const createCollectionFailure = createAction(
  '[Collections API] Create Collection Failure',
  props<{ error: string }>()
);

export const deleteCollection = createAction(
  '[Collections API] Delete Collection',
  props<{ collection_id: string }>()
);

export const deleteCollectionSuccess = createAction(
  '[Collections API] Delete Collection Success',
  props<{ collections: CollectionDTO[] }>()
);

export const deleteCollectionFailure = createAction(
  '[Collections API] Delete Collection Failure',
  props<{ error: string }>()
);
