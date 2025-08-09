import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{

loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      seSouvenirDeMoi: [false]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, motDePasse } = this.loginForm.value;

      this.authService.login(email, motDePasse).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.notificationService.success(
            'Connexion réussie',
            `Bienvenue ${response.user.prenom} !`
          );
          
          // Redirection basée sur le rôle
          this.redirectBasedOnRole(response.user.role);
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.error(
            'Erreur de connexion',
            error.error?.message || 'Email ou mot de passe incorrect'
          );
        }
      });
    }
  }

  private redirectBasedOnRole(role: string) {
    switch(role) {
      case 'PATIENT':
        this.router.navigate(['/patient/dashboard']);
        break;
      case 'MEDECIN':
        this.router.navigate(['/medecin/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} est requis`;
      if (field.errors['email']) return 'Email invalide';
      if (field.errors['minlength']) return 'Minimum 6 caractères';
    }
    return '';
  }
}

