import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const token=localStorage.getItem('userToken')
  const router=inject(Router)

  if(token){
    router.navigate([''])
  return false
  }
  return true
};
