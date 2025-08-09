import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="dashboard-page admin-dashboard">
  <div class="dashboard-header">
    <h2><i class="fas fa-user-shield"></i> Bienvenue Administrateur</h2>
    <p>Gestion et supervision CasaHealth</p>
  </div>
  <div class="dashboard-cards">
    <div class="card stat-card">
      <h3><i class="fas fa-users"></i> Utilisateurs actifs</h3>
      <p class="stat-value">312</p>
      <button class="btn btn-primary">Voir utilisateurs</button>
    </div>
    <div class="card stat-card">
      <h3><i class="fas fa-hospital"></i> Structures médicales</h3>
      <p class="stat-value">27</p>
      <button class="btn btn-outline">Liste structures</button>
    </div>
    <div class="card stat-card">
      <h3><i class="fas fa-chart-line"></i> Statistiques</h3>
      <p class="stat-value">+12% ce mois</p>
      <button class="btn btn-outline">Voir stats</button>
    </div>
  </div>
  <div class="dashboard-actions">
    <button class="btn btn-success"><i class="fas fa-user-plus"></i> Ajouter un utilisateur</button>
    <button class="btn btn-info"><i class="fas fa-file-alt"></i> Exporter les données</button>
  </div>
</div>
`,
  styleUrl: './dashboard.css'
})
export class AdminDashboard {}
