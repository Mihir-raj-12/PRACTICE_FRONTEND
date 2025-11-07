import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators'; // <-- 1. Import tap

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@guesthouse.com', [Validators.required, Validators.email]],
      password: ['SuperAdminPassword!123', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = null;
    const loginDto = this.loginForm.value;

    // --- THIS IS THE NEW, ROBUST LOGIC ---
    this.authService.login(loginDto).subscribe({
      next: () => {
        // 2. The login was successful, token is saved.
        // NOW we ask the AuthService what our role is.
        const role = this.authService.getRoleFromToken();

        console.log('Login successful, role found:', role);

        // 3. Navigate based on the role from the service
        if (role === 'Admin') {
          this.router.navigate(['/admin/dashboard']);
        } else if (role === 'User') {
          this.router.navigate(['/user/dashboard']);
        } else {
          // This is a safety catch, though it should never happen
          this.errorMessage = "Login successful, but role is unknown.";
          this.authService.logout();
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
    // --- END OF NEW LOGIC ---
  }
}