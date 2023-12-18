import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token=localStorage.getItem('userToken')
  const router=inject(Router)

  if(token){
    return true
  }
  router.navigate(['login'])
  return false
};
