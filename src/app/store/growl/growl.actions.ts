import {createAction, props} from '@ngrx/store';
import {GrowlModel} from "../../core/models/growl";

// export const setGrowlMessage = createAction(
//   '[Growl] Set Message',
//   props<{ message: string; messageType: 'danger' | 'success' | 'warning' }>()
// );
//
// export const clearGrowlMessage = createAction('[Growl] Clear Message');


export const setGrowlMessage = createAction(
  '[Growl] Set Message',
  props<{growl: GrowlModel}>()
);
