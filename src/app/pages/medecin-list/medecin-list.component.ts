// src/app/components/collaborateurs-list/collaborateurs-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model'; // Import the User interface
import { MatDialog } from '@angular/material/dialog';
import { CreateMedPopupComponent } from '../create-med-popup/create-med-popup.component';


@Component({
  selector: 'app-collaborateurs-list',
  templateUrl: './medecin-list.component.html',
  styleUrls: ['./medecin-list.component.css'],
})
export class MedecinListComponent implements OnInit {
  usersByStatus: Map<string, User[]> = new Map();
  statuses: string[] = [];

  constructor(private medecinService: MedecinService, private router: Router,private dialog: MatDialog
  ) {}

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
  creerMedecin(id: number) {
    this.medecinService.creerMedecin(id).subscribe(
      (response) => {
        console.log('Collaborateur créé avec succès:', response);
        this.loadUsers(); // Reload users to reflect the changes
      },
      (error) => {
        console.error('Erreur lors de la création du collaborateur:', error);
      }
    );
  }
  archiverMedecin(id: number) {
    this.medecinService.archiveUser(id).subscribe(
      (response) => {
        console.log('Collaborateur archivé', response);
        this.loadUsers(); // Reload the user list to reflect changes
      },
      (error) => {
        console.error("Erreur lors de l'archivage du collaborateur", error);
      }
    );
  }
  openCreateMedDialog() {
    this.dialog.open(CreateMedPopupComponent, {
      width: '400px',
    });
  }
}
