import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="dashboard-page medecin-dashboard">
  <div class="dashboard-header">
    <h2><i class="fas fa-user-md"></i> Bienvenue Dr. Dupont</h2>
    <p>Votre espace professionnel CasaHealth</p>
  </div>
  <div class="dashboard-cards">
    <div class="card stat-card">
      <h3><i class="fas fa-calendar-check"></i> RDV du jour</h3>
      <p class="stat-value">8</p>
      <button class="btn btn-primary">Voir planning</button>
    </div>
    <div class="card stat-card">
      <h3><i class="fas fa-users"></i> Patients suivis</h3>
      <p class="stat-value">124</p>
      <button class="btn btn-outline">Liste patients</button>
    </div>
    <div class="card stat-card">
      <h3><i class="fas fa-envelope"></i> Messages</h3>
      <p class="stat-value">3 nouveaux</p>
      <button class="btn btn-outline">Boîte de réception</button>
    </div>
  </div>
  <div class="dashboard-actions">
    <button class="btn btn-success"><i class="fas fa-plus"></i> Ajouter un compte-rendu</button>
    <button class="btn btn-info"><i class="fas fa-video"></i> Démarrer une téléconsultation</button>
  </div>
</div>
`,
  styleUrl: './dashboard.css'
})
export class MedecinDashboard {}
