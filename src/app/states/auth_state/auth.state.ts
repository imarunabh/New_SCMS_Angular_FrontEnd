export interface AuthState {
    token: string;
    role: string | null;
    expirationDate: Date | null;
    isExpired:boolean
    
  }
  
  export const initialState: AuthState = {
    token: '',
    role: null,
    expirationDate: null,
    isExpired:false
  };
  