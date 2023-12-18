// user-profile.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './user.state';
import { userDataLoaded } from './user.actions';


export const userReducer = createReducer(
  initialUserState,
  on(userDataLoaded, (state, { user }) => ({ ...state, user }))
);
