import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state, auth = inject(AuthService)) => {
  
  if (auth.isLogged) {
    return true;
  }
  
  auth.logout();
  return false;
};
