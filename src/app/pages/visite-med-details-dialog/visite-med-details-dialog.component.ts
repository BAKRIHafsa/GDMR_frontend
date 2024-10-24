import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileService } from '../services/file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreneauService, StatusVisite } from '../services/creneau.service';
import { MatDialog } from '@angular/material/dialog';
import { DossierMedicalComponent } from '../dossier-medical/dossier-medical.component'; // Import your component
import { DossierMedicalService, DossierMedical } from '../services/dossierMedical.service';

@Component({
  selector: 'app-visite-med-details-dialog',
  templateUrl: './visite-med-details-dialog.component.html',
  styleUrl: './visite-med-details-dialog.component.css'
})
export class VisiteMedDetailsDialogComponent {
  motifAnnulation: string = ''; // For cancellation reason
  dossiersMedicaux: DossierMedical[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService,
    private creneauService: CreneauService,
    private dialogRef: MatDialogRef<VisiteMedDetailsDialogComponent>, // Inject MatDialogRef here
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private dossierMedicalService: DossierMedicalService
  ) {
    this.data.documents = this.data.documents || []; 
    console.log('Data passed to the dialog:', this.data); // Log the data object
  }
  ngOnInit() {
    // Vérifiez si l'ID du collaborateur est présent avant d'appeler la méthode
    if (this.data.collaborateur?.id) {
      this.getDossiersMedicaux(this.data.collaborateur.id); // Passer l'ID du collaborateur
    } else {
      console.warn('Aucun ID de collaborateur trouvé.');
    }
  }
  getDossiersMedicaux(idCollaborateur: number) {
    this.dossierMedicalService.getDossiersParCollaborateur(idCollaborateur).subscribe(
      (dossiers) => {
        this.dossiersMedicaux = dossiers; // Mettre à jour la liste des dossiers médicaux
      },
      (error) => {
        console.error('Erreur lors de la récupération des dossiers médicaux:', error);
        // Vous pouvez également afficher un message d'erreur ici
      }
    );
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

  changeStatus() {
    let newStatus: StatusVisite | null = null;

    if (this.data.statut === StatusVisite.PLANIFIE) {
        newStatus = StatusVisite.EN_COURS;
    } else if (this.data.statut === StatusVisite.EN_COURS) {
        newStatus = StatusVisite.TERMINE;
    }

    if (newStatus) {
        this.creneauService.updateCreneauStatusEtEnvoiNotif(this.data.idCréneau, newStatus).subscribe(() => {
            this.snackBar.open(`Statut mis à jour avec succès à ${newStatus}.`, 'Fermer', { duration: 3000 });
            this.dialogRef.close();
        }, error => {
            this.snackBar.open('Erreur lors de la mise à jour du statut.', 'Fermer', { duration: 3000 });
        });
    } else {
        this.snackBar.open('Statut invalide, aucune mise à jour effectuée.', 'Fermer', { duration: 3000 });
    }
}
openDossierMedicalDialog() {
  const dialogRef = this.dialog.open(DossierMedicalComponent, {
    data: { idCréneau: this.data.idCréneau } // Pass the Creneau ID to the dialog
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Optionally handle the result if needed
    }
  });
}

}



