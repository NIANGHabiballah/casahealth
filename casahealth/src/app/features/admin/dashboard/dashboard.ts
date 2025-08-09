import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';


// Interface pour les données de statistiques
interface StatValue {
  element: HTMLElement;
  currentValue: number;
}

// Interface pour les données du graphique
interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  borderWidth: number;
  fill: boolean;
  tension: number;
}

// Interface pour la configuration du graphique
interface AppointmentChartData {
  labels: string[];
  datasets: ChartDataset[];
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboard {

  private chart: Chart | null = null;
  private statsUpdateInterval: number | null = null;

  constructor() {
    this.initializeDashboard();
  }

  /**
   * Initialise le dashboard
   */
  private initializeDashboard(): void {
    // Angular 20+ : le cycle de vie ngAfterViewInit est préférable pour le DOM
    setTimeout(() => {
      this.initializeChart();
      this.animateStatCards();
      this.startStatsUpdater();
    });
  }

  /**
   * Initialise le graphique des rendez-vous
   */
  private initializeChart(): void {
    const canvas = document.getElementById('appointmentChart') as HTMLCanvasElement;
    
    if (!canvas) {
      console.error('Canvas element with id "appointmentChart" not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Unable to get 2D context from canvas');
      return;
    }

    const chartData: AppointmentChartData = {
      labels: ['Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août'],
      datasets: [
        {
          label: 'Rendez-vous',
          data: [156, 189, 234, 278, 345, 432],
          borderColor: '#1976d2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Téléconsultations',
          data: [23, 34, 45, 67, 89, 112],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'line' as ChartType,
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.1)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    };

    try {
      this.chart = new Chart(ctx, config);
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  }

  /**
   * Anime les cartes statistiques au chargement
   */
  private animateStatCards(): void {
    const statCards = document.querySelectorAll('.stat-card') as NodeListOf<HTMLElement>;
    
    if (statCards.length === 0) {
      console.warn('No stat cards found for animation');
      return;
    }

    statCards.forEach((card: HTMLElement, index: number) => {
      setTimeout(() => {
        // État initial
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        
        // Animation d'entrée
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      }, index * 100);
    });
  }

  /**
   * Simule la mise à jour des données en temps réel
   */
  private updateStats(): void {
    const statValues = document.querySelectorAll('.stat-value') as NodeListOf<HTMLElement>;
    
    statValues.forEach((valueElement: HTMLElement) => {
      const currentText = valueElement.textContent || '0';
      const currentValue = parseInt(currentText.replace(/[^0-9]/g, ''), 10);
      
      // 30% de chance de mise à jour
      if (Math.random() > 0.7) {
        const increment = Math.floor(Math.random() * 5) + 1;
        const newValue = currentValue + increment;
        
        // Préservation du format d'origine (avec suffixes comme M, K, etc.)
        let newText = currentText.replace(currentValue.toString(), newValue.toString());
        
        // Gestion spéciale pour les valeurs avec suffixes
        if (currentText.includes('M') && newValue >= 1000) {
          const millions = (newValue / 1000).toFixed(1);
          newText = `${millions}M`;
        } else if (currentText.includes('K') && newValue >= 1000) {
          const thousands = (newValue / 1000).toFixed(1);
          newText = `${thousands}K`;
        }
        
        valueElement.textContent = newText;
        
        // Animation de mise à jour
        this.animateValueUpdate(valueElement);
      }
    });
  }

  /**
   * Anime la mise à jour d'une valeur
   */
  private animateValueUpdate(element: HTMLElement): void {
    element.style.transform = 'scale(1.1)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 200);
  }

  /**
   * Démarre le système de mise à jour automatique des statistiques
   */
  private startStatsUpdater(): void {
    // Première mise à jour après 5 secondes
    setTimeout(() => {
      this.updateStats();
    }, 5000);

    // Puis mise à jour toutes les 30 secondes
    this.statsUpdateInterval = window.setInterval(() => {
      this.updateStats();
    }, 30000);
  }

  /**
   * Met à jour les données du graphique
   */
  public updateChartData(newData: number[][], labels?: string[]): void {
    if (!this.chart) {
      console.error('Chart not initialized');
      return;
    }

    try {
      if (labels) {
        this.chart.data.labels = labels;
      }

      if (newData.length >= 1) {
        this.chart.data.datasets[0].data = newData[0];
      }
      
      if (newData.length >= 2) {
        this.chart.data.datasets[1].data = newData[1];
      }

      this.chart.update('active');
    } catch (error) {
      console.error('Error updating chart data:', error);
    }
  }

  /**
   * Met à jour manuellement une statistique
   */
  public updateStatistic(selector: string, newValue: number | string): void {
    const element = document.querySelector(selector) as HTMLElement;
    
    if (!element) {
      console.warn(`Element with selector "${selector}" not found`);
      return;
    }

    element.textContent = newValue.toString();
    this.animateValueUpdate(element);
  }

  /**
   * Ajoute une nouvelle activité récente
   */
  public addRecentActivity(
    iconClass: string, 
    title: string, 
    description: string, 
    iconColor: string = '#4caf50'
  ): void {
    const activityContainer = document.querySelector('.recent-activity');
    
    if (!activityContainer) {
      console.warn('Recent activity container not found');
      return;
    }

    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.style.opacity = '0';
    activityItem.style.transform = 'translateX(-20px)';
    activityItem.style.transition = 'all 0.3s ease';

    activityItem.innerHTML = `
      <div class="activity-icon" style="background: ${iconColor};">
        <i class="${iconClass}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-title">${title}</div>
        <div class="activity-time">${description}</div>
      </div>
    `;

    // Insérer au début de la liste
    const firstActivity = activityContainer.querySelector('.activity-item');
    if (firstActivity) {
      activityContainer.insertBefore(activityItem, firstActivity);
    } else {
      activityContainer.appendChild(activityItem);
    }

    // Animation d'entrée
    setTimeout(() => {
      activityItem.style.opacity = '1';
      activityItem.style.transform = 'translateX(0)';
    }, 100);

    // Supprimer les anciens éléments si trop nombreux
    const activities = activityContainer.querySelectorAll('.activity-item');
    if (activities.length > 5) {
      const lastActivity = activities[activities.length - 1];
      lastActivity.remove();
    }
  }

  /**
   * Nettoie les ressources
   */
  public destroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }

    if (this.statsUpdateInterval) {
      clearInterval(this.statsUpdateInterval);
      this.statsUpdateInterval = null;
    }
  }

  /**
   * Méthode pour réinitialiser les animations
   */
  public resetAnimations(): void {
    const statCards = document.querySelectorAll('.stat-card') as NodeListOf<HTMLElement>;
    
    statCards.forEach((card: HTMLElement) => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      card.style.transition = 'none';
    });
  }

  /**
   * Obtient les statistiques actuelles
   */
  public getCurrentStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    const statElements = document.querySelectorAll('.stat-value') as NodeListOf<HTMLElement>;
    
    statElements.forEach((element: HTMLElement, index: number) => {
      const text = element.textContent || '0';
      const value = parseInt(text.replace(/[^0-9]/g, ''), 10);
      stats[`stat_${index}`] = value;
    });

    return stats;
  }
}
