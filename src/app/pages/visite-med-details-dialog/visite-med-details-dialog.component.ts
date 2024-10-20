import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-visite-med-details-dialog',
  templateUrl: './visite-med-details-dialog.component.html',
  styleUrl: './visite-med-details-dialog.component.css'
})
export class VisiteMedDetailsDialogComponent {
  motifAnnulation: string = ''; // For cancellation reason

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService,
    private dialogRef: MatDialogRef<VisiteMedDetailsDialogComponent>, // Inject MatDialogRef here
    private snackBar: MatSnackBar 
  ) {
    this.data.documents = this.data.documents || []; 
    console.log('Data passed to the dialog:', this.data); // Log the data object
  }
  downloadFile(filename: string) {
    this.fileService.downloadFile(filename).subscribe((response) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename; // Nom du fichier à télécharger
      a.click();
      window.URL.revokeObjectURL(url);
    }, (error) => {
      console.error('Erreur lors du téléchargement du fichier', error);
    });
  }
  onAnnuler() {
    if (!this.motifAnnulation || this.motifAnnulation.trim() === '') {
      this.snackBar.open('Le motif d\'annulation est obligatoire.', 'Fermer', { duration: 3000 });
      return;
    }

    // Here, you should call a method from the parent component or service to handle the cancellation.
    // You can also close the dialog with the cancellation data.
    this.dialogRef.close({
      action: 'annuler',
      motifAnnulation: this.motifAnnulation,
      idCréneau: this.data.idCréneau // Utilisation de idCréneau
    });
    this.snackBar.open('Visite annulée avec succès.', 'Fermer', { duration: 3000 });
  }
}



