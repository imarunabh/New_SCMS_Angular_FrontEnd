import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../states/auth_state/auth.state';
import { getUserRole } from '../../states/auth_state/auth.selectors';
import { loginStart } from '../../states/auth_state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userRole$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AuthState>
  ) {
    this.userRole$ = this.store.select(getUserRole);
  }

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Listen for role changes and navigate accordingly
    this.userRole$.subscribe((role) => {
      if (role){
        switch (role.toLowerCase()) {
          case 'admin':
            this.router.navigateByUrl('admin/dashboard');
            break;
          case 'student':
            this.router.navigateByUrl('student/dashboard');
            break;
          case 'teacher':
            this.router.navigateByUrl('teacher/dashboard');
            break;
          default:
            this.router.navigateByUrl('login');
        }
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(loginStart({ email, password }));
    } else {
      this.markFormInvalid();
    }
  }

  private markFormInvalid() {
    this.loginForm.get('email')?.setErrors({ incorrect: true });
    this.loginForm.get('password')?.setErrors({ incorrect: true });
  }
}
