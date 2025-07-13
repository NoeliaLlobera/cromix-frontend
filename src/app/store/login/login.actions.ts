import {createAction, props} from '@ngrx/store';
import {UserDTO} from "../../core/models/UserDTO";
import {IloginModel} from "../../login/models/login.model";


export const login = createAction(
  '[Login Page] Login',
  props<{ user: IloginModel }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login Success',
  props<{ user: UserDTO }>()
);

export const loginFailure = createAction(
  '[Login Page] Login Failed',
  props<{ error: string }>()
);

export const localhostLogin = createAction(
  '[Login Page] Localhost Login',
  props<{ user: UserDTO }>()
);

export const logout = createAction(
  '[Login Page] Logout'
);

export const signup = createAction(
  '[Login Page] Signup',
  props<{ user: IloginModel }>()
)

export const signupSuccess = createAction(
  '[Login Page] Signup Success',
  props<{ user: UserDTO }>()
);

export const signupFailure = createAction(
  '[Login Page] Signup Failed',
  props<{ error: string }>()
);
