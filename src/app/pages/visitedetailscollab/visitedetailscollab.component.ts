import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visitedetailscollab',
  templateUrl: './visitedetailscollab.component.html',
  styleUrl: './visitedetailscollab.component.css',
})
export class VisitedetailscollabComponent {
  constructor(
    public dialogRef: MatDialogRef<VisitedetailscollabComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
