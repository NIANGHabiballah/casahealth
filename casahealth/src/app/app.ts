import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Menu } from './shared/components/menu/menu';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
      
      <!-- Loading Spinner Global -->
      <div class="loading-overlay" *ngIf="isLoading">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Chargement de Casa Health...</p>
        </div>
      </div>
    </div>`,
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'Casa Health Dashboard';
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Écouter les changements de routes pour gérer les états de chargement
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Navigation vers:', event.url);
        // Réinitialiser le scroll en haut de page
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      });
  }
}
