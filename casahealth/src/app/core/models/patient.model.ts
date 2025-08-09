import { Component } from '@angular/core';
import { Utilisateur } from './user.model';


export interface Patient extends Utilisateur {
  dateNaissance: Date;
  adresse: string;
  antecedents?: string;
  allergies?: string;
  numeroAssurance?: string;
}
