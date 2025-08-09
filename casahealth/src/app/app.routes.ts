import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/patient/dashboard/dashboard';
// Ajoutez ici les imports pour les autres dashboards et pages
// Exemple :
import { MedecinDashboard } from './features/medecin/dashboard/dashboard';
import { AdminDashboard } from './features/admin/dashboard/dashboard';
import { Profil } from './features/patient/profil/profil';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  { path: 'patient/dashboard', component: Dashboard },
  // Ajoutez ici les routes pour les autres dashboards et pages
  // Exemple :
  { path: 'medecin/dashboard', component: MedecinDashboard },
  { path: 'admin/dashboard', component: AdminDashboard },
  { path: 'profil', component: Profil },
  // { path: '**', redirectTo: 'auth/login' } // Route de fallback
];


