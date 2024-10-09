import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreneauService, Creneau } from '../services/creneau.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-visitedetailscollab',
  templateUrl: './visitedetailscollab.component.html',
  styleUrl: './visitedetailscollab.component.css',
})
export class VisitedetailscollabComponent { 
   justification: string = ''; // For non-validation justification
   showJustificationField: boolean = false; // Pour afficher/cacher le champ de justification


  constructor(
    public dialogRef: MatDialogRef<VisitedetailscollabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private snackBar: MatSnackBar // Ajout de MatSnackBar pour les notifications

  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  valider(): void {
    this.dialogRef.close({ action: 'valider', creneauId: this.data.idCréneau });
    this.snackBar.open('Créneau validé avec succès.', 'Fermer', { duration: 3000 });
  }

  nonValider(): void {
    this.showJustificationField = true; // Affiche le champ de justification
  }

  submitNonValidation(): void {
    if (!this.justification || this.justification.trim() === '') {
      this.snackBar.open('La justification est obligatoire pour non-valider le créneau.', 'Fermer', { duration: 3000 });
      return;
    }

    this.dialogRef.close({ action: 'nonValider', creneauId: this.data.idCréneau, justification: this.justification });
  }
}
