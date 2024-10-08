import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-medecins-disponibles',
  templateUrl: './medecins-disponibles.component.html',
  styleUrl: './medecins-disponibles.component.css'
})
export class MedecinsDisponiblesComponent implements OnInit {
  medecinsDisponibles: User[] = [];
  date!: string;
  heureDebut!: string;
  heureFin!: string;

  constructor(private medecinService: MedecinService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer les paramètres de l'URL
    this.route.queryParams.subscribe(params => {
      this.date = params['date'] || null;
      this.heureDebut = params['heureDebut'] || null;
      this.heureFin = params['heureFin'] || null;

      if (this.date && this.heureDebut && this.heureFin) {
        this.loadMedecinsDisponibles();
      } else {
        console.error('Paramètres manquants dans l\'URL');
        // Gérer le cas où les paramètres sont manquants
      }
    });
  }
  
  loadMedecinsDisponibles() {
    // Implémenter la logique pour charger les médecins disponibles
    console.log('Chargement des médecins pour:', {
      date: this.date,
      heureDebut: this.heureDebut,
      heureFin: this.heureFin
    });
  }
  

  onSelectMedecin(medecinId: number): void {
    console.log(`Médecin sélectionné: ${medecinId}`);  }

  goBack(): void {
    this.router.navigate(['/creer-creneau']);
  }
}
