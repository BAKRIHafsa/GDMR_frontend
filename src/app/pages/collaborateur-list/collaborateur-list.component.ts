import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborateurService } from '../services/collaborateur.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-collaborateurs-list',
  templateUrl: './collaborateur-list.component.html',
  styleUrls: ['./collaborateur-list.component.css'],
})
export class CollaborateurListComponent implements OnInit {
  usersByStatus: Map<string, User[]> = new Map();
  statuses: string[] = [];

  constructor(
    private collaborateurService: CollaborateurService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.collaborateurService
      .getActiveAndCreatedCollaborateursAndChargeRH()
      .subscribe(
        (data) => {
          this.usersByStatus = new Map(Object.entries(data));
          this.statuses = Array.from(this.usersByStatus.keys());
        },
        (error) => {
          console.error('Erreur lors du chargement des utilisateurs', error);
        }
      );
  }

  /* modifierCollaborateur(id: number) {
    // Logic to modify a collaborator
    console.log('Modifier collaborateur', id);
  } */

  /*  modifierCollaborateur(id: number): void {
    if (id) {
      this.router.navigate(['/main/modifier-collaborateur', id]);
    } else {
      console.error("ID de l'utilisateur non défini");
    }
  } */
  /* modifierCollaborateur(id: number): void {
    if (id) {
      this.collaborateurService.getUser(id).subscribe(
        (user) => {
          if (user) {
             Stockez l'utilisateur dans un service partagé ou utilisez un state management comme NgRx
            this.collaborateurService.setCurrentUser(user); 
            this.router.navigate(['/main/modifier-collaborateur', id], {
              state: { user: user },
            });
          } else {
            console.error('Utilisateur non trouvé');
          }
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération de l'utilisateur",
            error
          );
        }
      );
    } else {
      console.error("ID de l'utilisateur non défini");
    }
  } */
  modifierCollaborateur(id: number): void {
    if (id) {
      this.router.navigate([`/main/collaborateurs/modifier/${id}`]);
    } else {
      console.error('ID non défini pour la modification du collaborateur');
    }
  }

  archiverCollaborateur(id: number) {
    // Logic to archive a collaborator
    console.log('Archiver collaborateur', id);
  }
}
