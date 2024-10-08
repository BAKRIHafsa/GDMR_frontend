import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model';

import {
  AuthService,
  UserProfile,
  ChangePasswordRequest,
} from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';
import { DossierMedicalPopUpComponent  } from '../dossier-medical-pop-up/dossier-medical-pop-up.component';
import { AntecedantService,Antecedant } from '../services/antecedant.service';
import { DossierMedicalDetailsComponent  } from '../dossier-medical-details/dossier-medical-details.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  userDetails: User | null = null;
  currentPassword: string = '';
  newPassword: string = '';
  showChangePasswordSection: boolean = false;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  dossierMedicalExists: boolean = false;



  antecedantForm!: FormGroup; // Formulaire pour les antécédents
  sexes = ['MALE', 'FEMALE'];
  bloodGroups = ['A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE'];

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private antecedantService: AntecedantService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.checkDossierMedical();
  }

  private loadUserProfile(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getUserProfile().subscribe(
        (profile) => {
          this.userProfile = profile;
          this.loadUserDetails();
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User is not logged in');
    }
  }

  private checkDossierMedical(): void {
    this.antecedantService.getAntecedantForCurrentUser().subscribe({
      next: (data) => {
        this.dossierMedicalExists = true; // Disable add button
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.dossierMedicalExists = false; // Enable add button
        } else {
          console.error('Error fetching medical dossier:', error);
        }
      }
    });
  }
  

  private loadUserDetails(): void {
    if (this.userProfile) {
      this.authService.getUserProfile().subscribe(
        (details) => {
          this.userDetails = details;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  toggleChangePasswordSection(): void {
    this.showChangePasswordSection = !this.showChangePasswordSection;
  }

  toggleShowCurrentPassword(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleShowNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  changePassword(): void {
    const changePasswordRequest: ChangePasswordRequest = {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
    };

    this.authService.changePassword(changePasswordRequest).subscribe(
      () => {
        alert('Password changed successfully');
        this.currentPassword = '';
        this.newPassword = '';
        this.showChangePasswordSection = false;

        const dialogRef = this.dialog.open(PasswordChangeDialogComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            window.location.href = '/login'; 
          }
        });
      },
      (error) => {
        console.error('Error changing password:', error);
        alert('Error changing password: ' + error.message);
      }
    );
  }

  openDossierMedicalPopUpDialog(): void {
    const dialogRef = this.dialog.open(DossierMedicalPopUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkDossierMedical(); 
      }
    });
  }
  openDossierMedicalDetails(): void {
    // Ici, vous pouvez ouvrir un dialogue ou naviguer vers une page de détails
    const dialogRef = this.dialog.open(DossierMedicalDetailsComponent, {
      data: { userId: this.userDetails?.idUser } // Transmettre l'ID utilisateur si nécessaire
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Traitez les résultats si nécessaire
    });
  }
  
}