import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

export const wrongRouteGuardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const snack=inject(SnackbarService)
  router.navigate([''])
  snack.showSuccess('Wrong route Entered')
  return false;
};
