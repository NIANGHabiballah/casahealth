import { StructureMedicale } from "./structure-medicale.model";

export interface TourneeMedicale {
  id?: number;
  medecinId: number;
  date: Date;
  itineraire: string;
  moyensTransport: string;
  structuresVisite: StructureMedicale[];
  placesDisponibles?: number;
}