import {createAction, props} from '@ngrx/store';
import {GrowlModel} from "../../core/models/growl";

export const setGrowlMessage = createAction(
  '[Growl] Set Message',
  props<{growl: GrowlModel}>()
);
