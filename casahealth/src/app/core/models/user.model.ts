
export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  role: 'PATIENT' | 'MEDECIN' | 'ADMIN';
  motDePasse?: string;
  dateCreation?: Date;
  actif?: boolean;
}