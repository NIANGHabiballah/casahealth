
interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  trend?: number;
}

interface HospitalOverview {
  title: string;
  value: number;
  icon: string;
}

interface ChartData {
  name: string;
  value: number;
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-structure',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-structure.html',
  styleUrls: ['./dashboard-structure.css']
})
export class DashboardStructureSanitaire implements OnInit {

  // Données statistiques principales
  statCards: StatCard[] = [
    {
      title: 'Total Rendez-Vous',
      value: 2560,
      icon: 'calendar',
      color: 'green',
      trend: 80
    },
    {
      title: 'Total Patients',
      value: 970,
      icon: 'users',
      color: 'brown',
      trend: 80
    }
  ];

  // Aperçu de l'hôpital
  hospitalOverview: HospitalOverview[] = [
    { title: 'Effectif total', value: 964, icon: 'users' },
    { title: 'Rendez-vous', value: 1000, icon: 'calendar' },
    { title: 'Nouveaux patients', value: 500, icon: 'user-plus' },
    { title: 'Téléphone', value: 200, icon: 'phone' }
  ];

  // Données pour le graphique de genre
  genderData: ChartData[] = [
    { name: 'Femme', value: 45 },
    { name: 'Homme', value: 30 },
    { name: 'Enfant', value: 25 }
  ];

  // Données pour les consultations
  consultationData = {
    telecons: { count: 1, color: 'blue' },
    local: { count: 1, color: 'red' }
  };

  // Données pour le graphique en ligne (semaine)
  weeklyData = [
    { day: 'Lun', rendezVous: 45, patients: 38 },
    { day: 'Mar', rendezVous: 52, patients: 43 },
    { day: 'Mer', rendezVous: 38, patients: 35 },
    { day: 'Jeu', rendezVous: 65, patients: 55 },
    { day: 'Ven', rendezVous: 48, patients: 42 },
    { day: 'Sam', rendezVous: 35, patients: 30 },
    { day: 'Dim', rendezVous: 25, patients: 20 }
  ];

  selectedClinic = 'Clinique Yacine';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialisation des données si nécessaire
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Ici vous pouvez charger les données depuis un service
    console.log('Chargement des données du dashboard...');
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    console.log('Recherche:', target.value);
  }

  onNotificationClick(): void {
    console.log('Notifications cliquées');
  }

  onProfileClick(): void {
    console.log('Profil cliqué');
  }

  navigateTo(route: string): void {
    // Navigation réelle entre dashboards/pages
    switch (route) {
      case 'dashboard':
        this.router.navigate(['/structure-medicale/dashboard']); break;
      case 'docteur':
        this.router.navigate(['/medecin/dashboard']); break;
      case 'admin':
        this.router.navigate(['/admin/dashboard']); break;
      case 'patients':
        this.router.navigate(['/patients']); break;
      case 'rendez-vous':
        this.router.navigate(['/rendez-vous']); break;
      case 'payment':
        this.router.navigate(['/payment']); break;
      case 'parametre':
        this.router.navigate(['/parametre']); break;
      case 'profil':
        this.router.navigate(['/profil']); break;
      default:
        this.router.navigate([route]);
    }
  }

  logout(): void {
    console.log('Déconnexion');
  }

  deleteProfile(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce profil ?')) {
      console.log('Suppression du profil');
    }
  }
}
