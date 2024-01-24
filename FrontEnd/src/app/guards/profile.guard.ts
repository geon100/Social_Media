import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const profileGuard: CanActivateFn = (route, state) => {
  const user = inject(UserService)
  const router=inject(Router)
  const routeId = route.paramMap.get('id');

    if (routeId) {
      let id:any=''
      user.getMe().subscribe((LogUser)=>{
        id=LogUser._id
        if(id && routeId===id){
          router.navigate(['/profile']);
          return false;
        }else
        return true
      })

      
    }

    return true
};
