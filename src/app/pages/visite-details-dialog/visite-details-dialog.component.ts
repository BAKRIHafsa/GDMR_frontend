import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-visite-details-dialog',
  templateUrl: './visite-details-dialog.component.html',
  styleUrl: './visite-details-dialog.component.css'
})
export class VisiteDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
