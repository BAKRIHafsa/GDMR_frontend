import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-collab-popup',
  templateUrl: './create-collab-popup.component.html',
  styleUrl: './create-collab-popup.component.css',
})
export class CreateCollabPopupComponent {
  user = {
    nom: '',
    prenom: '',
    username: '',
    dateNaissance: '',
    role: '',
    departement:'',
  };

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateCollabPopupComponent>
  ) {}

  onSubmit() {
    this.authService.createUser(this.user).subscribe(
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
  }

  close() {
    this.dialogRef.close(false);
  }
}
