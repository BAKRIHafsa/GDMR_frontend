import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AntecedantService, Antecedant  } from '../services/antecedant.service';

@Component({
  selector: 'app-dossier-medical-pop-up',
  templateUrl: './dossier-medical-pop-up.component.html',
  styleUrl: './dossier-medical-pop-up.component.css'
})
export class DossierMedicalPopUpComponent {
  antecedantForm: FormGroup;

  sexes = ['HOMME', 'FEMME'];
  bloodGroups = ['A_POSITIF', 'A_NEGATIF', 'B_POSITIF', 'B_NEGATIF', 'O_POSITIF', 'O_NEGATIF', 'AB_POSITIF', 'AB_NEGATIF'];

  constructor(
    public dialogRef: MatDialogRef<DossierMedicalPopUpComponent>,
    private fb: FormBuilder,
    private antecedantService: AntecedantService
  ) {
    this.antecedantForm = this.fb.group({
      sexe: ['', Validators.required],
      height: [null, Validators.required],
      weight: [null, Validators.required],
      groupeSanguin: ['', Validators.required],
      allergies: [''],
      medicaments: [''],
      fume: [false],
    });
  }

  saveAntecedant(): void {
    if (this.antecedantForm.valid) {
      this.antecedantService.createAntecedant(this.antecedantForm.value)
        .subscribe(() => {
          alert('Dossier médical enregistré avec succès !');
          this.dialogRef.close();
        }, (error) => {
          console.error('Erreur lors de l\'enregistrement du dossier médical:', error);
          alert('Erreur lors de l\'enregistrement: ' + error.message);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
