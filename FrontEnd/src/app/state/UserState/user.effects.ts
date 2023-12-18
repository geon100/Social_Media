// user-profile.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { loadUserData, userDataLoaded } from './user.actions';
import { UserService } from 'src/app/services/user.service';


@Injectable()
export class UserEffects {
  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserData),
      mergeMap(() =>
        this.userService.getMe().pipe(
          map((user) => userDataLoaded({user})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
