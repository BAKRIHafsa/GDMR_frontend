import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedecinService } from '../services/medecin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-med-popup',
  templateUrl: './create-med-popup.component.html',
  styleUrl: './create-med-popup.component.css'
})
export class CreateMedPopupComponent {
  medecinForm!: FormGroup;


  constructor(
    private medService: MedecinService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateMedPopupComponent>,
    private fb: FormBuilder,
  ) {this.medecinForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    username: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    experience: ['', Validators.required],
    qualification: ['', Validators.required],
    siteTravail: ['', Validators.required],
    specialite: ['']
  });}

  /* onSubmit() {
    this.medService.createUser(this.id, user.username, user.experience, user.qualification, user.siteTravail).subscribe(
      (response) => {
        this.snackBar.open('Utilisateur ajouté avec succès', 'Fermer', {
          duration: 3000,
        });
        this.dialogRef.close(true);
        window.location.reload();  // This reloads the page after user creation

      },
      (error) => {
        this.snackBar.open(
          "Erreur lors de l'ajout de l'utilisateur",
          'Fermer',
          { duration: 3000 }
        );
      }
    );
  } */
  /* onSubmit() {
    console.log('Form Submitted:', this.medecinForm.value); 
    if (this.medecinForm.valid) {
      const medecinData = {
        ...this.medecinForm.value,
        specialite: 'Médecin de travail', // Valeur par défaut
        role: 'MEDECIN' // Rôle de médecin
      };
      this.medService.creerMedecin(medecinData).subscribe(
        (response) => {
          this.snackBar.open('Utilisateur ajouté avec succès', 'Fermer', {
            duration: 3000,
          });
          console.log('Médecin créé avec succès:', response);
          this.dialogRef.close(true);
          //window.location.reload();  // This reloads the page after user creation
        },
        (error) => {
          console.error('Erreur lors de la création du médecin:', error);
          this.snackBar.open(
            "Erreur lors de l'ajout de l'utilisateur",
            'Fermer',
            { duration: 3000 }
          );
        }
      );
    }
  } */
    onSubmit() {
      if (this.medecinForm.valid) {
        this.medService.creerMedecin(this.medecinForm.value).subscribe({
          next: (response) => {
            console.log('Backend Response:', response);  // Debugging backend response
            this.snackBar.open(response.message, 'Fermer', {
              duration: 3000
            });
            this.dialogRef.close(true);
          },
          error: (err) => {
            console.error('Erreur détectée:', err);
            this.snackBar.open(err.error.message || 'Erreur lors de la création du médecin', 'Fermer', {
              duration: 3000
            });
          }
        });
      }
      else {
        this.snackBar.open('Veuillez remplir tous les champs obligatoires', 'Fermer', {
          duration: 3000
        });
      }
    }

  close() {
    this.dialogRef.close(false);
  }
}
