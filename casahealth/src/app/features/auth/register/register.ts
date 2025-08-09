import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  isLoading = false;
  showPassword = false;
  apiError: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      nom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,}$/)]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmMotDePasse: ['', [Validators.required]],
      role: ['PATIENT', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });
  }

  getFieldError(field: string): string | null {
    const control = this.registerForm.get(field);
    if (!control || control.valid || !control.touched) return null;
    if (control.errors && control.errors['required']) return 'Ce champ est requis';
    if (control.errors && control.errors['email']) return 'Email invalide';
    if (control.errors && control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} caractères`;
    if (control.errors && control.errors['pattern']) return 'Format invalide';
    if (field === 'confirmMotDePasse' && this.registerForm.errors && this.registerForm.errors['passwordMismatch']) return 'Les mots de passe ne correspondent pas';
    return null;
  }

  passwordsMatchValidator(form: FormGroup) {
    const pwd = form.get('motDePasse')?.value;
    const confirm = form.get('confirmMotDePasse')?.value;
    return pwd === confirm ? null : { passwordMismatch: true };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.apiError = null;
    // Appel API réel via AuthService
    const { prenom, nom, email, telephone, motDePasse, role } = this.registerForm.value;
    this.authService.register({ prenom, nom, email, telephone, motDePasse, role }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.apiError = err?.error?.message || 'Erreur lors de l’inscription';
      }
    });
  }
}
