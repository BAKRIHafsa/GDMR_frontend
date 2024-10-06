import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborateurService } from '../services/collaborateur.service';
import { User } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollabPopupComponent } from '../create-collab-popup/create-collab-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
  creerCollaborateur(id: number) {
    this.collaborateurService.activerCollab(id).subscribe({
      next: (response) => {
        this.snackBar.open('Le collaborateur a été activé avec succès', 'Fermer', { duration: 3000 });
            this.loadUsers();
      },
      error: (err) => {
        console.error('Erreur lors de l\'activation du collaborateur:', err);
        this.snackBar.open('Erreur lors de l\'activation du médecin', 'Fermer', { duration: 3000 });
      }
    });
  }
  modifierCollaborateur(id: number): void {
    if (id) {
      this.router.navigate([`/main/collaborateurs/modifier/${id}`]);
    } else {
      console.error('ID non défini pour la modification du collaborateur');
    }
  }

  archiverCollaborateur(id: number) {
    this.collaborateurService.archiveUser(id).subscribe(
      (response) => {
        console.log('Collaborateur archivé', response);
        this.loadUsers(); // Reload the user list to reflect changes
      },
      (error) => {
        console.error("Erreur lors de l'archivage du collaborateur", error);
      }
    );
  }
  openCreateCollabDialog() {
    this.dialog.open(CreateCollabPopupComponent, {
      width: '400px',
    });
  }
}
