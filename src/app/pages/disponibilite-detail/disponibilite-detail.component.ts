import { Component,Inject } from '@angular/core';
import {DisponibiliteDetails} from '../services/disponibilite.service';
import { User } from '../models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-disponibilite-detail',
  templateUrl: './disponibilite-detail.component.html',
  styleUrl: './disponibilite-detail.component.css'
})
export class DisponibiliteDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DisponibiliteDetails) {}

}
