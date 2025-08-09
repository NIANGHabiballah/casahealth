import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous } from '../models/rendez-vous.model';

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  private apiUrl = 'http://localhost:8080/api/rdv';

  constructor(private http: HttpClient) {}

  creerRendezVous(rdv: Partial<RendezVous>): Observable<RendezVous> {
    return this.http.post<RendezVous>(this.apiUrl, rdv);
  }

  getRendezVousPatient(patientId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  getRendezVousMedecin(medecinId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/medecin/${medecinId}`);
  }

  confirmerRendezVous(rdvId: number): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${rdvId}/confirmer`, {});
  }

  annulerRendezVous(rdvId: number, motif?: string): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.apiUrl}/${rdvId}/annuler`, { motif });
  }

  getCreneauxDisponibles(medecinId: number, date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/creneaux/${medecinId}?date=${date}`);
  }
}