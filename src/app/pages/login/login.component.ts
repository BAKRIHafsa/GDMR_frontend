import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj = {
    username: '',
    password: '',
    errorMessage: '',
  };

  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar
  ) {}

  onLogin() {
    this.authService.login(this.loginObj.username, this.loginObj.password).subscribe(
      (response) => {
        if (response.change_password_required) {
          // Redirigez l'utilisateur vers la page de changement de mot de passe
          this.router.navigate(['/change-password-first']);
          return;
        }
        sessionStorage.setItem('access_token', response.access_token);
        
        // Continuez avec la navigation si le changement de mot de passe n'est pas requis
        this.authService.getCurrentUserRole().subscribe(
          (roleResponse) => {
            const role = roleResponse.role;
            this.snackBar.open('Connexion réussie !', 'Close', {
              duration: 3000,
              panelClass: ['success-snackbar'],
            });
            this.redirectUser(role);
          },
          (roleError) => {
            console.error('Erreur lors de la récupération du rôle', roleError);
            this.loginObj.errorMessage = 'Erreur lors de la récupération du rôle';
            this.router.navigate(['/main']);
          }
        );
      },
      (error) => {
        this.loginObj.errorMessage = 'Invalid username or password';
        this.snackBar.open("Nom d'utilisateur ou mot de passe invalide", 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  
  private redirectUser(role: string): void {
    switch (role) {
      case 'ADMINISTRATEUR':
        this.router.navigate(['/main/admin-dashboard']);
        break;
      case 'CHARGE_RH':
        this.router.navigate(['/main/rh-dashboard']);
        break;
      case 'COLLABORATEUR':
        this.router.navigate(['/main/collab-dashboard']);
        break;
      case 'MEDECIN':
        this.router.navigate(['/main/med-dashboard']);
        break;
      default:
        this.router.navigate(['/main']);
    }
  }

}
