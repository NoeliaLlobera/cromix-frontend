import {createReducer, on} from '@ngrx/store';
import {setGrowlMessage, clearGrowlMessage} from './growl.actions';

export interface GrowlState {
  message: string;
  messageType: 'danger' | 'success' | 'warning';
}

export const initialState: GrowlState = {
  message: '',
  messageType: 'success',
};

export const growlReducer = createReducer(
  initialState,
  on(setGrowlMessage, (state, {message, messageType}) => ({
    ...state,
    message,
    messageType,
  })),
  on(clearGrowlMessage, (state) => ({
    ...state,
    message: '',
  }))
);
