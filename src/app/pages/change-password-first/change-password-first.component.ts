import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-change-password-first',
  templateUrl: './change-password-first.component.html',
  styleUrl: './change-password-first.component.css'
})
export class ChangePasswordFirstComponent {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]], // Ajoutez d'autres validateurs selon vos besoins
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm.value).subscribe(
        () => {
          this.snackBar.open('Mot de passe changé avec succès', 'Fermer', {
            duration: 3000,
          });
          this.changePasswordForm.reset(); // Réinitialiser le formulaire
        },
        (error) => {
          console.error('Erreur lors du changement de mot de passe:', error);
          this.snackBar.open('Erreur lors du changement de mot de passe', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }
  }

}
