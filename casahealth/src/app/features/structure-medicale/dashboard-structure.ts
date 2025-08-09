import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-structure',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-structure.html',
  styleUrls: ['./dashboard-structure.css']
})
export class DashboardStructureSanitaire {
  // Exemple de données, à remplacer par des appels API
  structures = [
    { name: 'Hôpital de Ziguinchor', type: 'Hôpital régional', statut: 'Actif', badge: 'success' },
    { name: 'Clinique Casamed', type: 'Clinique privée', statut: 'Actif', badge: 'primary' },
    { name: 'Centre de santé de Bignona', type: 'Centre de santé', statut: 'Actif', badge: 'secondary' }
  ];

  stats = [
    { value: 24, label: 'Structures actives', icon: 'fas fa-hospital', trend: '+3 ce mois', trendType: 'up' },
    { value: 7, label: 'Nouvelles demandes', icon: 'fas fa-envelope-open-text', trend: '+2 ce mois', trendType: 'up' },
    { value: 5, label: 'Structures en attente', icon: 'fas fa-clock', trend: 'Stable', trendType: 'warning' }
  ];
}
