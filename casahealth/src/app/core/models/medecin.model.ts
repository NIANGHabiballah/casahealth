import { Component } from '@angular/core';
import { Utilisateur } from '../models/user.model.js';
import { StructureMedicale } from './structure-medicale.model.js';


export interface Medecin extends Utilisateur {
  specialite: string;
  numeroOrdre: string;
  disponibilite: string;
  tarifConsultation?: number;
  structureMedicale?: StructureMedicale;
  latitude?: number;
  longitude?: number;
}