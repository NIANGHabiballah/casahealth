import { Component } from '@angular/core';
import { Paiement } from './paiement.model';


export interface RendezVous {
  id?: number;
  patientId: number;
  medecinId: number;
  structureMedicaleId?: number;
  dateHeure: Date;
  statut: 'PLANIFIE' | 'CONFIRME' | 'ANNULE' | 'TERMINE';
  motifConsultation?: string;
  notes?: string;
  typeConsultation: 'PRESENTIEL' | 'TELECONSULTATION';
  paiement?: Paiement;
}
