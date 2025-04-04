import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './states/auth_state/auth.state';
import { logout } from './states/auth_state/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'New_School_Management_System';

  constructor(private store:Store<AuthState>){}

  logout(){
    this.store.dispatch(logout());
  }
}
