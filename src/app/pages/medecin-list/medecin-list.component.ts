import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model'; // Import the User interface
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateMedPopupComponent } from '../create-med-popup/create-med-popup.component';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-collaborateurs-list',
  templateUrl: './medecin-list.component.html',
  styleUrls: ['./medecin-list.component.css'],
})
export class MedecinListComponent implements OnInit {
  usersByStatus: Map<string, User[]> = new Map();
  statuses: string[] = [];
  activationForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    username: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    qualification: ['', Validators.required],
    experience: ['', Validators.required],
    siteTravail: ['', Validators.required],
    specialite: ['', Validators.required]
  });

  constructor(private medecinService: MedecinService, private router: Router,private dialog: MatDialog,private snackBar: MatSnackBar,private fb: FormBuilder 

  ) {}

  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.medecinService.getActiveAndCreatedMedecins().subscribe(
      (data) => {
        console.log('Données reçues depuis l\'API:', data);
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
 /*  creerMedecin(id: number, username: string, experience: string, qualification: string, siteTravail: string) {
    this.medecinService.creerMedecin(id: number, username: string, experience: string, qualification: string, siteTravail: string).subscribe(
      (response) => {
        console.log('Collaborateur créé avec succès:', response);
        this.loadUsers(); 
      },
      (error) => {
        console.error('Erreur lors de la création du collaborateur:', error);
      }
    );
  } */
    /* activerMedecin(id: number): void {
      this.medecinService.activerMedecin(id, { responseType: 'text' }).subscribe(
        (response: string) => { 
          console.log('Médecin activé avec succès:', response);
          this.loadUsers();
          this.snackBar.open('Médecin activé avec succès', 'Fermer', {
            duration: 3000,
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'activation du médecin:', error.message);
          this.snackBar.open('Erreur lors de l\'activation du médecin', 'Fermer', {
            duration: 3000,
          });
        }
      );
    } */
      activerMedecin(id: number) {
        this.medecinService.activerMedecin(id).subscribe({
          next: (response) => {
            // Si la réponse est correcte
            this.snackBar.open('Le médecin a été activé avec succès', 'Fermer', { duration: 3000 });
            this.loadUsers();
          },
          error: (err) => {
            console.error('Erreur lors de l\'activation du médecin:', err); // Affiche les détails de l'erreur
            this.snackBar.open('Erreur lors de l\'activation du médecin', 'Fermer', { duration: 3000 });
          }
        });
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
    const dialogRef = this.dialog.open(CreateMedPopupComponent, {
      width: '400px',
    });
    console.log('Dialog opened:', dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result) {
        console.log('Newly created doctor:', result);
        const createdList = this.usersByStatus.get('created') || [];
        createdList.push(result);  // Assurez-vous que "result" contient le nouveau médecin
        this.usersByStatus.set('created', createdList);  // Mettre à jour la liste "created"
        this.loadUsers();
      }
    });
  }
}
