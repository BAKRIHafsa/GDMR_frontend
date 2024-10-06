import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model';

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

  constructor(private medecinService: MedecinService, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les paramètres de navigation (date, heureDebut, heureFin)
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.date = navigation.extras.state['date'];          // Utilisation de la notation entre crochets
      this.heureDebut = navigation.extras.state['heureDebut']; // Utilisation de la notation entre crochets
      this.heureFin = navigation.extras.state['heureFin'];     // Utilisation de la notation entre crochets

      // Appeler le service pour récupérer les médecins disponibles
      this.medecinService.MedecinsDisponibles(this.date, this.heureDebut, this.heureFin).subscribe(medecins => {
        this.medecinsDisponibles = medecins;
      });
    }
  }


  onSelectMedecin(medecinId: number): void {
    console.log(`Médecin sélectionné: ${medecinId}`);  }

  goBack(): void {
    this.router.navigate(['/creer-creneau']);
  }
}
