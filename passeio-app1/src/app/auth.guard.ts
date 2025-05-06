import {CanActivateFn, Router} from '@angular/router';
import {AuthgoogleService} from './authgoogle.service';
import {inject} from '@angular/core';
import {Profile} from './landingpage/profile';

export const authGuard: CanActivateFn = (route, state) => {

  const loginService: AuthgoogleService = inject(AuthgoogleService);
  const router: Router = inject(Router);

  const loggedProfile: Profile = loginService.getLoggedProfile();
  if (loggedProfile) {
    return true
  }
  router.navigate(['']).then();

  return false;

};
