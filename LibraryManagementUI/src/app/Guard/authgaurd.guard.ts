import { CanActivateFn } from '@angular/router';

export const authgaurdGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem('username') ? true : false;
};
