import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const getExpirationDate = createSelector(getAuthState, (state) => state.expirationDate);

export const getUserRole = createSelector(getAuthState, (state) => state.role);

export const getToken = createSelector(getAuthState, (state) => state.token);

export const isTokenExpired = createSelector(getAuthState, (state) => state.isExpired);

