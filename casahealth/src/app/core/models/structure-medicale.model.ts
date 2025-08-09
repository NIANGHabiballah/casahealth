
export interface StructureMedicale {
  id?: number;
  nom: string;
  typeStructure: 'HOPITAL' | 'CLINIQUE' | 'CABINET' | 'CENTRE_SANTE';
  adresse: string;
  latitude: number;
  longitude: number;
  telephone?: string;
  email?: string;
  horairesOuverture?: string;
  services?: string[];
}
