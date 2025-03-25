import { createAction, props } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGOUT = '[Auth] Logout';
export const SET_EXPIRATION = '[Auth] Set Expiration';
export const SET_ROLE = '[Auth] Set Role';
export const MARK_EXPIRED = '[Auth] Mark Expired';

export const markExpired = createAction(MARK_EXPIRED);

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ token: string; role: string; expirationDate: Date }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE,
  props<{ error: string }>()
);

export const logout = createAction(LOGOUT);

export const setExpiration = createAction(
  SET_EXPIRATION,
  props<{ date: Date }>()
);

export const setRole = createAction(
  SET_ROLE,
  props<{ role: string }>()
);
