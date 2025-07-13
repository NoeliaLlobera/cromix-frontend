import { CanMatchFn } from '@angular/router';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const user = localStorage.getItem('user');
  return !!user;
};
