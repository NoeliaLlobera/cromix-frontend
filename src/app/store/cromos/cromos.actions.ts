import {createAction, props} from "@ngrx/store";
import {CollectionDTO} from "../../core/models/collectionDTO";
import {CromoTypeDTO} from "../../core/models/cromo-typeDTO";

export const getCollectionInfo = createAction(
  '[Cromos Page] Get Collection Info',
  props<{ collection_id: string }>()
);

export const getCollectionInfoSuccess = createAction(
  '[Cromos Page] Get Collection Success',
  props<{ collection: CollectionDTO }>()
);

export const getCollectionInfoFailure = createAction(
  '[Cromos Page] Get Collection Failure',
  props<{ error: string }>()
);

export const getCromos = createAction(
  '[Cromos Page] Get Cromos',
  props<{ collection_id: string }>()
)

export const getCromosSuccess = createAction(
  '[Cromos Page] Get Cromos Success',
  props<{ cromos: CromoTypeDTO[] }>()
);

export const getCromosFailure = createAction(
  '[Cromos Page] Get Cromos Failure',
  props<{ error: string }>()
);

export const createCromo = createAction(
  '[Cromos API] Create Cromo',
  props<{ cromo: CromoTypeDTO }>()
);

export const createCromoSuccess = createAction(
  '[Cromos API] Create Cromo Success',
  props<{ cromo: CromoTypeDTO }>()
);

export const createCromoFailure = createAction(
  '[Cromos API] Create Cromo Failure',
  props<{ error: string }>()
);


export const updateCromo = createAction(
  '[Cromos API] Update Cromo',
  props<{ cromo: CromoTypeDTO }>()
);

export const updateCromoSuccess = createAction(
  '[Cromos API] Update Cromo Success',
  props<{ cromo: CromoTypeDTO }>()
);

export const updateCromoFailure = createAction(
  '[Cromos API] Update Cromo Failure',
  props<{ error: string }>()
);

export const deleteCromo = createAction(
  '[Cromos API] Delete Cromo',
  props<{ cromo_id: string }>()
);

export const deleteCromoSuccess = createAction(
  '[Cromos API] Delete Cromo Success',
  props<{ cromo_id: string }>()
);

export const deleteCromoFailure = createAction(
  '[Cromos API] Delete Cromo Failure',
  props<{ error: string }>()
);

//
// export const createCollectionSuccess = createAction(
//   '[Collections API] Create Collection Success',
//   props<{ collections: CollectionDTO[] }>()
// );
//
// export const createCollectionFailure = createAction(
//   '[Collections API] Create Collection Failure',
//   props<{ error: string }>()
// );
//
// export const deleteCollection = createAction(
//   '[Collections API] Delete Collection',
//   props<{ collection_id: string }>()
// );
//
// export const deleteCollectionSuccess = createAction(
//   '[Collections API] Delete Collection Success',
//   props<{ collections: CollectionDTO[] }>()
// );
//
// export const deleteCollectionFailure = createAction(
//   '[Collections API] Delete Collection Failure',
//   props<{ error: string }>()
// );
