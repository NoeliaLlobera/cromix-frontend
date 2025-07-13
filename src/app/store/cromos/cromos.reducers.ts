
import { CollectionDTO } from "../../core/models/collectionDTO";
import { createReducer, on } from "@ngrx/store";
import {
  createCromo, createCromoFailure, createCromoSuccess,
  deleteCromo, deleteCromoFailure, deleteCromoSuccess,
  getCollectionInfo,
  getCollectionInfoFailure,
  getCollectionInfoSuccess,
  getCromos, getCromosFailure,
  getCromosSuccess, updateCromo, updateCromoFailure, updateCromoSuccess
} from "./cromos.actions";
import { CromoTypeDTO } from "../../core/models/cromo-typeDTO";

export interface CromosState {
  isLoading: boolean;
  error: string | null;
  collection: CollectionDTO;
  cromo_types: CromoTypeDTO[];
}

export const initialCromosState: CromosState = {
  isLoading: false,
  error: null,
  collection: {
    collection_id: '',
    collection_name: '',
    total_cromos: 0,
    creator_id: '',
    users_connected: 0
  },
  cromo_types: []
};

export const cromosReducer = createReducer(
  initialCromosState,
  on(getCollectionInfo, (state: CromosState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getCollectionInfoSuccess, (state: CromosState, { collection }: { collection: CollectionDTO }) => ({
    ...state,
    isLoading: false,
    error: null,
    collection
  })),
  on(getCollectionInfoFailure, (state: CromosState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(getCromos, (state: CromosState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(getCromosSuccess, (state: CromosState, { cromos }: { cromos: CromoTypeDTO[] }) => ({
    ...state,
    isLoading: false,
    error: null,
    cromo_types: cromos
  })),
  on(getCromosFailure, (state: CromosState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(createCromo, (state: CromosState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  on(createCromoSuccess, (state: CromosState, { cromo }: { cromo: CromoTypeDTO }) => ({
    ...state,
    isLoading: false,
    error: null,
    cromo_types: [...state.cromo_types, cromo]
  })),
  on(createCromoFailure, (state: CromosState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(updateCromo, (state: CromosState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  // on(updateCromoSuccess, (state: CromosState, { cromo }: { cromo: CromoTypeDTO }) => {
  //   const updatedCromos = state.cromo_types.map((item: CromoTypeDTO) =>
  //     item.cromo_id === cromo.cromo_id ? cromo : item
  //   );
  //   return {
  //     ...state,
  //     isLoading: false,
  //     error: null,
  //     cromo_types: updatedCromos
  //   };
  // }),
  on(updateCromoFailure, (state: CromosState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(deleteCromo, (state: CromosState) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  // on(deleteCromoSuccess, (state: CromosState, { cromo_id }: { cromo_id: string }) => {
  //   const updatedCromos = state.cromo_types.filter((item: CromoTypeDTO) => item.cromo_id !== cromo_id);
  //   return {
  //     ...state,
  //     isLoading: false,
  //     error: null,
  //     cromo_types: updatedCromos
  //   };
  // }),
  on(deleteCromoFailure, (state: CromosState, { error }: { error: string }) => ({
    ...state,
    isLoading: false,
    error: error
  }))
);
