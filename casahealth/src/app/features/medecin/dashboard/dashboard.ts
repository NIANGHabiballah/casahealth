import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medecin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="dashboard-page"><h2>Tableau de bord Médecin</h2></div>`,
  styleUrl: './dashboard.css'
})
export class MedecinDashboard {}
