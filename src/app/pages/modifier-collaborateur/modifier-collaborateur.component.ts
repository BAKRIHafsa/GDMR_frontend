// modifier-collaborateur.component.ts
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CollaborateurService } from '../services/collaborateur.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-modifier-collaborateur',
  templateUrl: './modifier-collaborateur.component.html',
  styleUrls: ['./modifier-collaborateur.component.css'],
})
export class ModifierCollaborateurComponent implements OnInit {
  user: User = {} as User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private collaborateurService: CollaborateurService,
    private snackBar: MatSnackBar
  ) {}

  /* ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(+userId);
    }
  } */
  /* ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUser(+id);
    } else {
      console.error("ID non trouvé dans l'URL");
      this.router.navigate(['/main/collaborateurs']);
    }
  } */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.collaborateurService.getUser(+id).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => {
          console.error("Erreur lors du chargement de l'utilisateur:", err);
        },
      });
    } else {
      console.error("ID non trouvé dans l'URL");
      this.router.navigate(['/main/collaborateurs']);
    }
  }

  /*  loadUser(id: number): void {
    this.collaborateurService.getUser(id).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error(
          'Erreur lors du chargement des informations du collaborateur',
          error
        );
      }
    );
  } */

  onSubmit(): void {
    if (this.user.idUser) {
      this.collaborateurService
        .updateUser(this.user.idUser, this.user)
        .subscribe(
          (response) => {
            console.log('Collaborateur mis à jour', response);
            this.snackBar.open(
              'Les modifications ont été enregistrées avec succès!',
              'Fermer',
              {
                duration: 3000, // Duration in milliseconds
                verticalPosition: 'top', // Position at the top of the screen
                horizontalPosition: 'center', // Centered horizontally
                panelClass: ['snack-bar-success'], // Custom class for styling
              }
            );
            this.router.navigate(['/main/collaborateurs']);
          },
          (error) => {
            console.error(
              'Erreur lors de la mise à jour du collaborateur',
              error
            );
            this.snackBar.open(
              "Erreur lors de l'enregistrement des modifications. Veuillez réessayer.",
              'Fermer',
              {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['snack-bar-error'],
              }
            );
          }
        );
    } else {
      console.error("ID de l'utilisateur manquant pour la mise à jour");
    }
  }
}
