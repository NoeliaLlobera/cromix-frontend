import {createReducer, on} from "@ngrx/store";
import {UserDTO} from "../../core/models/UserDTO";
import {
  login,
  loginSuccess,
  loginFailure,
  localhostLogin,
  logout,
  signup,
  signupSuccess,
  signupFailure
} from "./login.actions";


export interface LoginState {
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  user: UserDTO | null;
}

export const initialLoginState: LoginState = {
  isLoading: false,
  error: null,
  isLoggedIn: false,
  user: null
};
export const loginReducer = createReducer(
  initialLoginState,
  on(login, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(loginSuccess, (state, {user}) => {
    return {
      ...state,
      isLoading: false,
      isLoggedIn: true,
      error: null,
      user: user
    };
  }),
  on(loginFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: error,
        user: null
      }
    ),
  ),
  on(localhostLogin, (state, {user}) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      error: null,
      user: user
    }
  )),
  on(logout, (state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      error: null,
      user: null
    }
  )),
  on(signup, (state) => {
    return {
      ...state,
      isLoading: true,
    }
  }),
  on(signupSuccess, (state, {user}) => {
    return {
      ...state,
      isLoading: false,
      isLoggedIn: false,
      error: null,
      user: null
    };
  }),
  on(signupFailure, (state, {error}) => ({
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: error,
        user: null
      }
    ),
  ),
);
