import { Component } from '@angular/core';

export interface Paiement {
  id?: number;
  rendezVousId: number;
  montant: number;
  modePaiement: 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY' | 'ESPECES' | 'CARTE';
  statut: 'EN_ATTENTE' | 'PAYE' | 'REMBOURSE' | 'ECHEC';
  dateTransaction?: Date;
}