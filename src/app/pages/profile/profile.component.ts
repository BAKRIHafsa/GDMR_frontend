import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  UserProfile,
  ChangePasswordRequest,
} from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordChangeDialogComponent } from '../password-change-dialog/password-change-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  currentPassword: string = '';
  newPassword: string = '';
  showChangePasswordSection: boolean = false;
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getUserProfile().subscribe(
        (profile) => {
          this.userProfile = profile;
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    } else {
      console.error('User is not logged in');
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
    const changePasswordRequest = {
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
            // Redirect to login page
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
}
