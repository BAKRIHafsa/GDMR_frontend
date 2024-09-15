import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-change-dialog',
  templateUrl: './password-change-dialog.component.html',
  styleUrls: ['./password-change-dialog.component.css'],
})
export class PasswordChangeDialogComponent {
  constructor(public dialogRef: MatDialogRef<PasswordChangeDialogComponent>) {}

  onReauthenticate(): void {
    this.dialogRef.close(true); // Return true if user wants to re-authenticate
  }

  onStay(): void {
    this.dialogRef.close(false); // Return false if user wants to stay
  }
}
