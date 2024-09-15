import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-disponibilite-dialog',
  templateUrl: './add-disponibilite-dialog.component.html',
  styleUrl: './add-disponibilite-dialog.component.css',
})
export class AddDisponibiliteDialogComponent {
  ajoutDisponibiliteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDisponibiliteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.ajoutDisponibiliteForm = this.fb.group({
      date: [data.date],
      heuredebut: [''],
      heurefin: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.ajoutDisponibiliteForm.value);
  }
}
