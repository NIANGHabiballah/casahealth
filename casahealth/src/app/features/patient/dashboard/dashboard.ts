import { CommonModule } from '@angular/common';
import { Component, OnInit } from "@angular/core";
import { RendezVous } from "../../../core/models/rendez-vous.model";
import { StructureMedicale } from "../../../core/models/structure-medicale.model";
import { Patient } from "../../../core/models/patient.model";
import { AuthService } from "../../../core/services/auth.service";
import { GeolocationService } from "../../../core/services/geolocation.service";
import { RouterModule } from '@angular/router';
import { RdvService } from '../../../core/services/rdv.service';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

patient: Patient | null = null;
  prochainRdv: RendezVous | null = null;
  rdvRecents: RendezVous[] = [];
  structuresProches: StructureMedicale[] = [];
  isLoadingLocation = false;
  quickActions = [
    {
      title: 'Prendre RDV',
      description: 'Réserver une consultation',
      icon: 'fas fa-calendar-plus',
      route: '/patient/rdv',
      color: 'primary'
    },
    {
      title: 'Urgence',
      description: 'Trouver une urgence',
      icon: 'fas fa-ambulance',
      route: '/patient/urgence',
      color: 'danger'
    },
    {
      title: 'Téléconsultation',
      description: 'Consulter en ligne',
      icon: 'fas fa-video',
      route: '/patient/teleconsultation',
      color: 'info'
    },
    {
      title: 'Mon Dossier',
      description: 'Mes documents médicaux',
      icon: 'fas fa-folder-medical',
      route: '/patient/dossier',
      color: 'success'
    }
  ];

  constructor(
    private authService: AuthService,
    private rdvService: RdvService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.loadPatientData();
    this.loadRendezVous();
    this.loadNearbyStructures();
  }

  loadPatientData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'PATIENT') {
      this.patient = currentUser as Patient;
    }
  }

  loadRendezVous() {
    if (this.patient?.id) {
      this.rdvService.getRendezVousPatient(this.patient.id).subscribe({
        next: (rdvs) => {
          this.rdvRecents = rdvs.slice(0, 3);
          this.prochainRdv = rdvs.find(rdv => 
            rdv.statut === 'CONFIRME' && new Date(rdv.dateHeure) > new Date()
          ) || null;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des RDV:', error);
        }
      });
    }
  }

  loadNearbyStructures() {
    this.isLoadingLocation = true;
    this.geolocationService.getCurrentPosition().subscribe({
      next: (coords) => {
        // Ici, vous feriez appel à votre API pour récupérer les structures proches
        // Pour la démo, on simule des données
        this.structuresProches = this.getMockNearbyStructures();
        this.isLoadingLocation = false;
      },
      error: (error) => {
        console.error('Erreur géolocalisation:', error);
        this.isLoadingLocation = false;
        // Charger des structures par défaut
        this.structuresProches = this.getMockNearbyStructures();
      }
    });
  }

  private getMockNearbyStructures(): StructureMedicale[] {
    return [
      {
        id: 1,
        nom: 'Hôpital de Ziguinchor',
        typeStructure: 'HOPITAL',
        adresse: 'Quartier Kandé, Ziguinchor',
        latitude: 12.5681,
        longitude: -16.2719,
        telephone: '+221 33 991 20 35',
        services: ['Urgences', 'Maternité', 'Chirurgie']
      },
      {
        id: 2,
        nom: 'Clinique Sainte Marie',
        typeStructure: 'CLINIQUE',
        adresse: 'Route de Bignona, Ziguinchor',
        latitude: 12.5791,
        longitude: -16.2639,
        telephone: '+221 33 991 45 67',
        services: ['Consultation générale', 'Laboratoire']
      }
    ];
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusBadgeClass(status: string): string {
    switch(status) {
      case 'CONFIRME': return 'badge-success';
      case 'PLANIFIE': return 'badge-warning';
      case 'ANNULE': return 'badge-danger';
      case 'TERMINE': return 'badge-secondary';
      default: return 'badge-primary';
    }
  }
}

