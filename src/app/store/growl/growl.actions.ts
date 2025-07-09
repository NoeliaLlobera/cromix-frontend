import {createAction, props} from '@ngrx/store';

export const setGrowlMessage = createAction(
  '[Growl] Set Message',
  props<{ message: string; messageType: 'danger' | 'success' | 'warning' }>()
);

export const clearGrowlMessage = createAction('[Growl] Clear Message');
