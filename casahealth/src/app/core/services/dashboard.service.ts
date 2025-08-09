import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

export interface DashboardStats {
  totalRendezVous: number;
  totalPatients: number;
  effectifTotal: number;
  nouveauxPatients: number;
  consultationsTelephone: number;
  trendRendezVous: number;
  trendPatients: number;
}

export interface PatientGender {
  femme: number;
  homme: number;
  enfant: number;
}

export interface WeeklyReport {
  day: string;
  rendezVous: number;
  patients: number;
}

export interface ConsultationType {
  telecons: number;
  local: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = 'http://localhost:8080/api/v1'; // Remplacer par votre URL Spring Boot
  
  // Subjects pour la gestion de l'état
  private dashboardStatsSubject = new BehaviorSubject<DashboardStats | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Observables publics
  public dashboardStats$ = this.dashboardStatsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Récupérer les statistiques du dashboard
  getDashboardStats(): Observable<DashboardStats> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<DashboardStats>(`${this.API_URL}/dashboard/stats`)
      .pipe(
        retry(2), // Retry 2 fois en cas d'erreur réseau
        map(stats => {
          this.dashboardStatsSubject.next(stats);
          this.loadingSubject.next(false);
          return stats;
        }),
        catchError(this.handleError.bind(this))
      );
  }

  // Récupérer les données de genre des patients
  getPatientGenderData(): Observable<PatientGender> {
    return this.http.get<PatientGender>(`${this.API_URL}/dashboard/patients/gender`)
      .pipe(
        retry(2),
        catchError(this.handleError.bind(this))
      );
  }

  // Récupérer les données hebdomadaires
  getWeeklyReportData(): Observable<WeeklyReport[]> {
    return this.http.get<WeeklyReport[]>(`${this.API_URL}/dashboard/reports/weekly`)
      .pipe(
        retry(2),
        catchError(this.handleError.bind(this))
      );
  }

  // Récupérer les types de consultation
  getConsultationTypes(): Observable<ConsultationType> {
    return this.http.get<ConsultationType>(`${this.API_URL}/dashboard/consultations/types`)
      .pipe(
        retry(2),
        catchError(this.handleError.bind(this))
      );
  }

  // Mettre à jour les statistiques en temps réel
  refreshDashboard(): void {
    this.getDashboardStats().subscribe();
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse): Observable<never> {
    this.loadingSubject.next(false);
    
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 0:
          errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion internet.';
          break;
        case 404:
          errorMessage = 'Service non disponible (404)';
          break;
        case 500:
          errorMessage = 'Erreur serveur interne (500)';
          break;
        default:
          errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
      }
    }
    
    console.error('Erreur Dashboard Service:', errorMessage);
    this.errorSubject.next(errorMessage);
    return throwError(() => errorMessage);
  }

  // Données mockées pour le développement (à supprimer en production)
  getMockData(): Observable<DashboardStats> {
    const mockStats: DashboardStats = {
      totalRendezVous: 2560,
      totalPatients: 970,
      effectifTotal: 964,
      nouveauxPatients: 500,
      consultationsTelephone: 200,
      trendRendezVous: 80,
      trendPatients: 80
    };

    return new Observable(observer => {
      setTimeout(() => {
        this.dashboardStatsSubject.next(mockStats);
        observer.next(mockStats);
        observer.complete();
      }, 1000);
    });
  }

  getMockGenderData(): Observable<PatientGender> {
    const mockGender: PatientGender = {
      femme: 45,
      homme: 30,
      enfant: 25
    };

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockGender);
        observer.complete();
      }, 500);
    });
  }

  getMockWeeklyData(): Observable<WeeklyReport[]> {
    const mockWeekly: WeeklyReport[] = [
      { day: 'Lun', rendezVous: 45, patients: 38 },
      { day: 'Mar', rendezVous: 52, patients: 43 },
      { day: 'Mer', rendezVous: 38, patients: 35 },
      { day: 'Jeu', rendezVous: 65, patients: 55 },
      { day: 'Ven', rendezVous: 48, patients: 42 },
      { day: 'Sam', rendezVous: 35, patients: 30 },
      { day: 'Dim', rendezVous: 25, patients: 20 }
    ];

    return new Observable(observer => {
      setTimeout(() => {
        observer.next(mockWeekly);
        observer.complete();
      }, 700);
    });
  }

  // Nettoyer les subjects lors de la destruction du service
  destroy(): void {
    this.dashboardStatsSubject.complete();
    this.loadingSubject.complete();
    this.errorSubject.complete();
  }
}

// services/notification.service.ts
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor() {}

  // Ajouter une notification
  addNotification(type: 'success' | 'error' | 'warning' | 'info', message: string, duration = 5000): void {
    const notification = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date()
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    // Supprimer automatiquement après la durée spécifiée
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, duration);
  }

  // Supprimer une notification
  removeNotification(id: number): void {
    const currentNotifications = this.notificationsSubject.value;
    const filteredNotifications = currentNotifications.filter(n => n.id !== id);
    this.notificationsSubject.next(filteredNotifications);
  }

  // Nettoyer toutes les notifications
  clearNotifications(): void {
    this.notificationsSubject.next([]);
  }
}

interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
}