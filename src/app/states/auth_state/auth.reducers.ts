import { createReducer, on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginSuccess, logout, markExpired, setExpiration, setRole } from "./auth.action";


const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    token: action.token,
    role: action.role,
    expirationDate: action.expirationDate,
    isExpired:false
  })),
  on(setExpiration, (state, action) => ({
    ...state,
    expirationDate: action.date
  })),
  on(setRole, (state, action) => ({
    ...state,
    role: action.role
  })),
  on(logout, (state) => ({
    ...state,
    token: '',
    role: null,
    expirationDate: null
  })),
  on(markExpired,(state)=>({
    ...state,
    isExpired:true
  }))
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
