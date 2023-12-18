import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const token=localStorage.getItem('adminToken')
  const router=inject(Router)

  if(token){
    router.navigate(['admin/dashboard'])
  return false
  }
  return true
};
