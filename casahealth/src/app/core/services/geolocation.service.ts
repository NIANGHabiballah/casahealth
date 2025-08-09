import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StructureMedicale } from '../models/structure-medicale.model.js';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  
  getCurrentPosition(): Observable<Coordinates> {
    return new Observable(observer => {
      if (!navigator.geolocation) {
        observer.error('Géolocalisation non supportée');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          observer.complete();
        },
        (error) => observer.error(error),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.toRadians(coord2.latitude - coord1.latitude);
    const dLon = this.toRadians(coord2.longitude - coord1.longitude);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(coord1.latitude)) * Math.cos(this.toRadians(coord2.latitude)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  findNearestStructures(userCoords: Coordinates, structures: StructureMedicale[]): StructureMedicale[] {
    return structures
      .map(structure => ({
        ...structure,
        distance: this.calculateDistance(userCoords, {
          latitude: structure.latitude,
          longitude: structure.longitude
        })
      }))
      .sort((a, b) => (a as any).distance - (b as any).distance);
  }
}
