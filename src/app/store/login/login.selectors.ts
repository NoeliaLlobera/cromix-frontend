import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LoginState} from "./login.reducers";


export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectIsLoading = createSelector(
  selectLoginState,
  (state: LoginState) => state.isLoading
);
export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state: LoginState) => state.isLoggedIn
);
export const selectUser = createSelector(
  selectLoginState,
  (state: LoginState) => state.user
);

export const selectLoginStateError = createSelector(
  selectLoginState,
  (state: LoginState) => state.error
);
