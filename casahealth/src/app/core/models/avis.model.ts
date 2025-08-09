
export interface Avis {
  id?: number;
  patientId: number;
  medecinId?: number;
  structureMedicaleId?: number;
  note: number; // 1-5
  commentaire: string;
  date: Date;
  recommande?: boolean;
}