import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DossierMedicalService } from '../services/dossierMedical.service'; // Import your service
import { MatSnackBar } from '@angular/material/snack-bar';
import { Creneau } from '../models/creneau.model'; // Import your Creneau model

@Component({
  selector: 'app-dossier-medical',
  templateUrl: './dossier-medical.component.html',
  styleUrl: './dossier-medical.component.css'
})
export class DossierMedicalComponent {
  dossierMedical: any = {
    description: '',
    medicaments: '',
    creneau: { idCréneau: null },
    collaborateur: { idUser: null } // Initialize creneau as an empty object
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject dialog data
    private dossierMedicalService: DossierMedicalService,
    private dialogRef: MatDialogRef<DossierMedicalComponent>,
    private snackBar: MatSnackBar
  ) {
    this.dossierMedical.creneau.idCréneau = data.idCréneau; // Set creneau ID from dialog data
  }

  ajouterDossier() {
    if (!this.dossierMedical.collaborateur?.idUser) {
      console.error('Collaborateur ID is required');
      this.snackBar.open('Collaborateur ID is required', 'Close', { duration: 3000 });
      return;
    }
    this.dossierMedicalService.ajouterDossierMedical(this.dossierMedical, this.dossierMedical.collaborateur.idUser)
      .subscribe(
        (response) => {
          this.snackBar.open('Dossier médical ajouté avec succès!', 'Fermer', { duration: 3000 });
          this.dialogRef.close(response);
        },
        (error) => {
          this.snackBar.open('Erreur lors de l\'ajout du dossier médical.', 'Fermer', { duration: 3000 });
          console.error('Erreur lors de l\'ajout du dossier médical', error);
        }
      );
  }
  
}