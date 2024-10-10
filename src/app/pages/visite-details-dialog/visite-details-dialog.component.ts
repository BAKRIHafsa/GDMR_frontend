import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreneauService } from '../services/creneau.service'; // Assurez-vous que le service est importé
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visite-details-dialog',
  templateUrl: './visite-details-dialog.component.html',
  styleUrl: './visite-details-dialog.component.css'
})
export class VisiteDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private creneauService: CreneauService,
    private snackBar: MatSnackBar, // Pour afficher les notifications
    private dialogRef: MatDialogRef<VisiteDetailsDialogComponent> // Pour fermer le dialogue après succès
  ) {}

  onModifierStatut(): void {
    // Appel au service pour modifier le statut à "planifié"
    this.creneauService.modifierStatutCreneau(this.data.id, 'PLANIFIE').subscribe(
      () => {
        // Afficher un message de succès
        this.snackBar.open('Le statut de la visite a été mis à jour à "planifié"', 'Fermer', {
          duration: 3000,
        });

        // Fermer le dialogue
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de la modification du statut:', error);
        this.snackBar.open('Erreur lors de la mise à jour du statut', 'Fermer', {
          duration: 3000,
        });
      }
    );
  }

}
