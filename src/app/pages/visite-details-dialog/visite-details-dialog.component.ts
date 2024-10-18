import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreneauService, ModifierCreneauDTO } from '../services/creneau.service'; // Assurez-vous que le service est importé
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user.model';
import { MedecinService } from '../services/medecin.service';


@Component({
  selector: 'app-visite-details-dialog',
  templateUrl: './visite-details-dialog.component.html',
  styleUrl: './visite-details-dialog.component.css'
})
export class VisiteDetailsDialogComponent {
  medecinsDisponibles: User[] = []; // Médecins disponibles pour la visite
  isLoading = false;
  showMedecins = false; // État pour contrôler l'affichage des médecins
  isEditable = false;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private creneauService: CreneauService,
    private medecinService: MedecinService, // Injection du service de médecins
    private snackBar: MatSnackBar, // Pour afficher les notifications
    private dialogRef: MatDialogRef<VisiteDetailsDialogComponent> // Pour fermer le dialogue après succès
  ) {}
  confirmerModification(): void {
    this.loadMedecinsDisponibles();
    this.showMedecins = true; // Afficher la liste des médecins après confirmation

  }
  ngOnInit(): void {
    // Charger les médecins disponibles lorsque le composant est initialisé
    this.loadMedecinsDisponibles();
    console.log('Statut de la visite:', this.data.statusVisite); // Vérifiez la valeur ici
    this.isEditable = this.data.statusVisite === 'NON_VALIDE';
  }

  loadMedecinsDisponibles(): void {
    this.isLoading = true;
    this.medecinService.MedecinsDisponibles(
      this.data.date,
      this.formatTime(this.data.heureDebutVisite),
      this.formatTime(this.data.heureFinVisite)
    ).subscribe(
      (medecins: User[]) => {
        this.medecinsDisponibles = medecins;
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement des médecins disponibles:', error);
        this.isLoading = false;
      }
    );
  }

  // Formater l'heure pour l'envoi au service
/*   formatTime(time: string): string {
    return time + ":00.000000";
  } */
    formatTime(time: string): string {
      const date = new Date(`1970-01-01T${time}Z`); // Convertir la chaîne de temps en objet Date
      const hours = String(date.getUTCHours()).padStart(2, '0'); // Obtenir l'heure UTC
      const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Obtenir les minutes
      const seconds = String(date.getUTCSeconds()).padStart(2, '0'); // Obtenir les secondes (00)
      return `${hours}:${minutes}:${seconds}.000000`; // Retourne "HH:mm:ss.000000"
    }
  
  selectMedecin(medecinId: number): void {
    this.data.medecinId = medecinId;
  }

  /* onModifierStatut(): void {
    // Appel au service pour modifier le statut à "planifié"
    this.creneauService.modifierStatutCreneau(this.data.id, 'PLANIFIE').subscribe(
      () => {
        // Afficher un message de succès
        this.snackBar.open('Le statut de la visite a été mis à jour à "planifié"', 'Fermer', {
          duration: 3000,
        });

        // Fermer le dialogue
        this.dialogRef.close();
      },
      (error) => {
        console.error('Erreur lors de la modification du statut:', error);
        this.snackBar.open('Erreur lors de la mise à jour du statut', 'Fermer', {
          duration: 3000,
        });
      }
    );
  } */
    onModifierStatut(): void {
      if (!this.data.medecinId) {
        this.snackBar.open('Veuillez sélectionner un médecin avant de continuer.', 'Fermer', {
          duration: 3000,
        });
        return;
      }
      if (this.data.statusVisite === 'NON_VALIDE') {
        // Si le statut est "NON_VALIDE", appeler la méthode pour modifier la visite non validée
        this.modifierVisiteNonValide();
      } else if (this.data.statusVisite === 'VALIDE') {
        // Si le statut est "PLANIFIE", appeler une méthode différente pour ce cas
        this.modifierVisitePlanifie();
      } else {
        // Gérer d'autres statuts ou afficher un message d'erreur si nécessaire
        this.snackBar.open('Le statut actuel ne permet pas cette modification', 'Fermer', {
          duration: 3000,
        });
      }
    }
  
    // Méthode pour modifier une visite non validée
    modifierVisiteNonValide(): void {
      if (!this.data.date || !this.data.heureDebutVisite || !this.data.heureFinVisite || !this.data.medecinId) {
        this.snackBar.open('Veuillez remplir tous les champs obligatoires.', 'Fermer', {
          duration: 3000,
        });
        return;
      }
      console.log('Modification des détails de visite avec :', {
        date: this.data.date,
        heureDebutVisite: this.formatTime(this.data.heureDebutVisite),
        heureFinVisite: this.formatTime(this.data.heureFinVisite),
        medecinId: this.data.medecinId, // Assurez-vous que cette valeur est correcte
        statusVisite: 'EN_ATTENTE_VALIDATION'
      });
      const modifDetails: ModifierCreneauDTO = {
        date: this.data.date, // Date au format string
        heureDebutVisite: this.formatTime(this.data.heureDebutVisite), // Heure de début formatée
        heureFinVisite: this.formatTime(this.data.heureFinVisite), // Heure de fin formatée
        medecinId: this.data.medecinId, // ID du médecin
        statusVisite: "EN_ATTENTE_VALIDATION" // Vous pouvez définir le statut ici ou le récupérer depuis les données
      };
    
      this.creneauService.modifierVisiteNonValide(this.data.id, modifDetails).subscribe(
        () => {
          this.snackBar.open('Le créneau a été modifié et est en attente de validation.', 'Fermer', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erreur lors de la modification du créneau:', error);
          this.snackBar.open('Erreur lors de la modification du créneau', 'Fermer', {
            duration: 3000,
          });
        }
      );
    }

    
    // Méthode pour modifier une visite planifiée
    modifierVisitePlanifie(): void {
      this.creneauService.modifierStatutCreneau(this.data.id, 'PLANIFIE').subscribe(
        () => {
          this.snackBar.open('Le statut de la visite a été mis à jour à "planifié"', 'Fermer', {
            duration: 3000,
          });
          this.dialogRef.close();
        },
        (error) => {
          console.error('Erreur lors de la modification du statut:', error);
        this.snackBar.open('Erreur lors de la mise à jour du statut', 'Fermer', {
          duration: 3000,
        });
        }
      );
    }

}
