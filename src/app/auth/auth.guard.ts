import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state, auth = inject(AuthService)) => {
  
  if (auth.isLogged) {

    if (!auth.IsValid) {
      auth.logout();
    }

    return true;
  }
  
  return false;
};
