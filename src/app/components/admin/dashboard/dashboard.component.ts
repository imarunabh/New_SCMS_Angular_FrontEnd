import { Component } from '@angular/core';
import { AuthState } from '../../../states/auth_state/auth.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { isTokenExpired } from '../../../states/auth_state/auth.selectors';
import { interval, Subscribable, Subscription } from 'rxjs';
import { logout } from '../../../states/auth_state/auth.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private tokenCheckSubscription:Subscription;
  constructor(private store:Store<AuthState>,private router:Router) {}

  ngOnInit():void{
     interval(30000).subscribe(()=>{
      this.store.select(isTokenExpired).subscribe(isExpired=>{
        if(isExpired){
          this.handleLogout();
        }
      })
     })
    
  }

  private handleLogout(): void {
    this.store.dispatch(logout()); // Dispatch logout action
    this.router.navigate(['/login']); // Redirect to login page
  }

  ngOnDestroy(): void {
    // Unsubscribe when component is destroyed to avoid memory leaks
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }

  redirectToAddStudent(){}

}
