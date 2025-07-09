import {GrowlModel} from "../../core/models/growl";
import {createReducer, on} from "@ngrx/store";
import {setGrowlMessage} from "./growl.actions";

export interface GrowlState {
  message: string,
  type: 'danger' | 'success' | 'warning';
};

export const initialGrowlState: GrowlState = {
  message: '',
  type: 'success'
}

export const growlReducer = createReducer(
  initialGrowlState,
  on(setGrowlMessage, (state, {growl}) => {
    return {
      ...state,
      message: growl.message,
      type: growl.type
    };
  })
)
