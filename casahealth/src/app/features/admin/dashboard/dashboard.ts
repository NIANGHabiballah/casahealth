import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="dashboard-page"><h2>Tableau de bord Administrateur</h2></div>`,
  styleUrl: './dashboard.css'
})
export class AdminDashboard {}
