import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileService } from '../services/file.service';


@Component({
  selector: 'app-visite-med-details-dialog',
  templateUrl: './visite-med-details-dialog.component.html',
  styleUrl: './visite-med-details-dialog.component.css'
})
export class VisiteMedDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fileService: FileService // Injection du service
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
}



