
import { AuthReducer } from "./states/auth_state/auth.reducers";
import { AUTH_STATE_NAME } from "./states/auth_state/auth.selectors";
import { AuthState } from "./states/auth_state/auth.state";

export interface AppState{
    [AUTH_STATE_NAME]:AuthState
}

export const appReducer ={
    [AUTH_STATE_NAME]:AuthReducer
}