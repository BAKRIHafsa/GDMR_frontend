import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user-popup',
  templateUrl: './create-user-popup.component.html',
  styleUrl: './create-user-popup.component.css',
})
export class CreateUserPopupComponent {
  user = {
    nom: '',
    prenom: '',
    username: '',
    dateNaissance: '',
    role: 'COLLABORATEUR',
  };

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateUserPopupComponent>
  ) {}

  onSubmit() {
    this.authService.createUser(this.user).subscribe(
      (response) => {
        this.snackBar.open('Utilisateur ajouté avec succès', 'Fermer', {
          duration: 3000,
        });
        this.dialogRef.close();
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
    this.dialogRef.close();
  }
}
