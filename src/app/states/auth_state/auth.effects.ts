import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { catchError, interval, map, of, switchMap, tap } from "rxjs";
import { AuthState } from "./auth.state";
import { loginFailure, loginStart, loginSuccess, logout, markExpired } from "./auth.action";

const BASIC_URL = 'http://localhost:8080/';
export const AUTH_HEADER = 'authorization';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AuthState>,
    private router: Router
  ) {}

  
  checkExpiration$ = createEffect(()=>
    interval(60000).pipe(
      map(()=>{
        const expirationDate = new Date(localStorage.getItem('expirationDate') || '');
        if(expirationDate && new Date() > expirationDate){
          return markExpired();
        }
        else{
          return {type:'NO_ACTION'};
        }
      })
    )
  )


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) =>
        this.http.post(BASIC_URL + 'authenticate', { email: action.email, password: action.password }, { observe: 'response' })
          .pipe(
            map((res: HttpResponse<any>) => {
              const token = res.headers.get(AUTH_HEADER) || '';
              const bearerToken = token.substring(7); // Remove 'Bearer ' prefix
              const user = res.body;
              const role = user?.role || null;
              const expirationTime = user?.tokenExpiration; // 5 minutes expiry
 

              localStorage.setItem('c_token', bearerToken);
              localStorage.setItem('c_user', JSON.stringify(user));
              localStorage.setItem('expirationDate',  new Date(expirationTime).toISOString());


              return loginSuccess({ token: bearerToken, role,  expirationDate: new Date(expirationTime) });
            }),
            catchError((error) =>
              of(loginFailure({ error: error.message || 'Login failed' }))
            )
          )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('c_token');
          localStorage.removeItem('c_user');
          localStorage.removeItem('expirationDate')
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
