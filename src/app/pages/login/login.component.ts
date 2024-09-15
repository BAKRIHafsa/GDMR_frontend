import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService
      .login(this.loginObj.username, this.loginObj.password)
      .subscribe(
        (response) => {
          sessionStorage.setItem('access_token', response.access_token);

          this.authService.getCurrentUserRole().subscribe(
            (roleResponse) => {
              const role = roleResponse.role;
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
            },
            (roleError) => {
              console.error(
                'Erreur lors de la récupération du rôle',
                roleError
              );
              this.loginObj.errorMessage =
                'Erreur lors de la récupération du rôle';
              this.router.navigate(['/main']);
            }
          );
        },
        (error) => {
          this.loginObj.errorMessage = 'Invalid username or password';
        }
      );
  }
}
