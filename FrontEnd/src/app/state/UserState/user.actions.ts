// user-profile.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

export const loadUserData = createAction('[User Data] Load User Data');
export const userDataLoaded = createAction('[User Data] User Data Loaded', props<{ user: User }>());
