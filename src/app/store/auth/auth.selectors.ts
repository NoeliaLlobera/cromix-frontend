import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from "./auth.reducers";


export const selectLoginState = createFeatureSelector<AuthState>('login');

export const selectIsLoading = createSelector(
  selectLoginState,
  (state: AuthState) => state.isLoading
);
export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state: AuthState) => state.isLoggedIn
);
export const selectUser = createSelector(
  selectLoginState,
  (state: AuthState) => state.user
);

export const selectLoginStateError = createSelector(
  selectLoginState,
  (state: AuthState) => state.error
);
