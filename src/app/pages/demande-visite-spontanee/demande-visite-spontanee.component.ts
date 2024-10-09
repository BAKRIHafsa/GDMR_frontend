import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreneauService } from '../services/creneau.service';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-demande-visite-spontanee',
  templateUrl: './demande-visite-spontanee.component.html',
  styleUrl: './demande-visite-spontanee.component.css'
})
export class DemandeVisiteSpontaneeComponent {
  motif: string = '';
  selectedFiles: File[] = [];


  constructor(private creneauService: CreneauService, private snackBar: MatSnackBar) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        this.selectedFiles = Array.from(input.files);
    }
}

removeFile(index: number) {
  this.selectedFiles.splice(index, 1);
}
  // Méthode pour créer une visite spontanée
  /* creerVisiteSpontanee() {
    if (!this.motif) {
      this.snackBar.open('Veuillez entrer un motif.', 'Fermer', { duration: 3000 });
      return;
    }

    const request = { motif: this.motif };

    this.creneauService.creerVisiteSpontanee(request).subscribe(
      (response) => {
        this.snackBar.open('Visite spontanée demandée avec succès.', 'Fermer', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Erreur lors de la demande de la visite spontanée.', 'Fermer', { duration: 3000 });
      }
    );
  } */
    creerVisiteSpontanee() {
      // Vérifiez si le motif est vide
      if (!this.motif) {
        this.snackBar.open('Veuillez entrer un motif.', 'Fermer', { duration: 3000 });
        return;
      }
    
      // Créez un objet FormData pour l'envoi
      const formData = new FormData();
      formData.append('motif', this.motif);
    
      // Vérifiez s'il y a des fichiers sélectionnés et les ajoutez au FormData
      if (this.selectedFiles.length > 0) {
        for (let file of this.selectedFiles) {
          formData.append('fichiers', file);
        }
      }
    
      // Appelez le service pour créer la visite spontanée
      this.creneauService.creerVisiteSpontanee(formData).subscribe(
        (response) => {
          this.snackBar.open('Visite spontanée demandée avec succès.', 'Fermer', { duration: 3000 });
          // Réinitialisez les champs
          this.motif = '';
          this.selectedFiles = [];
        },
        (error) => {
          // Affichez un message d'erreur plus informatif
          const errorMessage = error.error?.message || 'Erreur lors de la demande de la visite spontanée.';
          this.snackBar.open(errorMessage, 'Fermer', { duration: 3000 });
        }
      );
    
      // Debugging
      console.log('Motif:', this.motif);
      console.log('Fichiers:', this.selectedFiles);
    }
    
}
