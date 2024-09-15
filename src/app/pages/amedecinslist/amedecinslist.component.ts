import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-amedecinslist',
  templateUrl: './amedecinslist.component.html',
  styleUrl: './amedecinslist.component.css',
})
export class AmedecinslistComponent implements OnInit {
  activeMedecins: User[] = [];

  constructor(private medecinService: MedecinService) //private router: Router
  {}

  ngOnInit(): void {
    this.loadActiveMedecins();
  }

  loadActiveMedecins(): void {
    this.medecinService.getActiveMedecins().subscribe(
      (data: Map<string, User[]>) => {
        this.activeMedecins = data.get('active') || [];
      },
      (error) => {
        console.error('Error fetching active medecins', error);
      }
    );
  }
}
