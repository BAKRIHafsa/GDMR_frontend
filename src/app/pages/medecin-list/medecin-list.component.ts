// src/app/components/collaborateurs-list/collaborateurs-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model'; // Import the User interface

@Component({
  selector: 'app-collaborateurs-list',
  templateUrl: './medecin-list.component.html',
  styleUrls: ['./medecin-list.component.css'],
})
export class MedecinListComponent implements OnInit {
  usersByStatus: Map<string, User[]> = new Map();
  statuses: string[] = [];

  constructor(private medecinService: MedecinService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.medecinService.getActiveAndCreatedMedecins().subscribe(
      (data) => {
        this.usersByStatus = new Map(Object.entries(data));
        this.statuses = Array.from(this.usersByStatus.keys());
      },
      (error) => {
        console.error('Erreur lors du chargement des Médecins', error);
      }
    );
  }

  /*   modifierMedecin(id: number): void {
    if (id) {
      this.router.navigate([`/main/medecins/modifier/${id}`]);
    } else {
      console.error('ID non défini pour la modification du collaborateur');
    }
  } */

  archiverMedecin(id: number) {
    // Logic to archive a collaborator
    console.log('Archiver Medecin', id);
  }
}
