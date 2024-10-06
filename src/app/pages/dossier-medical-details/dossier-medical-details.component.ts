import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AntecedantService, Antecedant } from '../services/antecedant.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dossier-medical-details',
  templateUrl: './dossier-medical-details.component.html',
  styleUrl: './dossier-medical-details.component.css'
})
export class DossierMedicalDetailsComponent implements OnInit {
  antecedant!: Antecedant; 
  isEditing: boolean = false; 
  bloodGroups = ['A_POSITIF', 'A_NEGATIF', 'B_POSITIF', 'B_NEGATIF', 'O_POSITIF', 'O_NEGATIF', 'AB_POSITIF', 'AB_NEGATIF'];


  constructor(
    private antecedantService: AntecedantService,
    public dialogRef: MatDialogRef<DossierMedicalDetailsComponent>
  ) {}

  ngOnInit(): void {
    this.loadAntecedant();
  }

  private loadAntecedant(): void {
    this.antecedantService.getAntecedantForCurrentUser().subscribe(
      (antecedant) => {
        this.antecedant = antecedant;
      },
      (error) => {
        console.error('Error fetching antecedent:', error);
      }
    );
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing; 
  }

  saveChanges(): void {
    if (this.antecedant) {
      this.antecedantService.updateAntecedant(this.antecedant.idAntecedant!, this.antecedant).subscribe(
        () => {
          alert('Dossier médical mis à jour avec succès');
          this.isEditing = false;
          this.loadAntecedant();
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du dossier médical :', error);
          alert('Erreur lors de la mise à jour du dossier médical : ' + error.message);
        }
      );
    }
  }
  
  
}