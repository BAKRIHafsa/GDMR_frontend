import { Component, OnInit } from '@angular/core';
import { CreneauService, Creneau } from '../services/creneau.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitedetailscollabComponent } from '../visitedetailscollab/visitedetailscollab.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // Ajout pour les notifications


@Component({
  selector: 'app-calendrier-collab',
  templateUrl: './calendrier-collab.component.html',
  styleUrl: './calendrier-collab.component.css',
})
export class CalendrierCollabComponent implements OnInit {
  calendarOptions!: CalendarOptions;

  constructor(
    private creneauService: CreneauService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeCalendarOptions();
    this.loadCreneaux();
  }

  /* initializeCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
      selectable: true,
      events: [], // Initialisation avec un tableau vide
    };
  } */
  initializeCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: true,
      selectable: true,
      events: [],
      eventClick: this.handleEventClick.bind(this),
    };
  }

  loadCreneaux(): void {
    this.creneauService.getCreneaux().subscribe(
      (creneaux: Creneau[]) => {
        this.calendarOptions.events = creneaux.map((creneau) => ({
          title: creneau.typeVisite,
          start: `${creneau.date}T${creneau.heureDebutVisite}`,
          end: `${creneau.date}T${creneau.heureFinVisite}`,
          backgroundColor: creneau.statusVisite === 'EN_ATTENTE_VALIDATION' ? 'red' : '', 
          extendedProps: {
            idCréneau: creneau.idCréneau,
            date: creneau.date,
            heureDebutVisite: creneau.heureDebutVisite,
            heureFinVisite: creneau.heureFinVisite,
            typeVisite: creneau.typeVisite,
            statusVisite: creneau.statusVisite,
            motif: creneau.motif,
            justifNonValide: creneau.justifNonValide,
            justifAnnuleMedecin: creneau.justifAnnuleMedecin,
            justifAnnuleCollaborateur: creneau.justifAnnuleCollaborateur,
            medecin: {
              idUser: creneau.medecin.idUser,
              nom: creneau.medecin.nom,
              prenom: creneau.medecin.prenom,
              siteTravail: creneau.medecin.siteTravail,
              experience: creneau.medecin.experience,
              qualification: creneau.medecin.qualification,
              specialite: creneau.medecin.specialite,
            },
            collaborateur: {
              idUser: creneau.collaborateur.idUser,
              nom: creneau.collaborateur.nom,
              prenom: creneau.collaborateur.prenom,
            },
            chargeRh: {
              idUser: creneau.chargeRh.idUser,
              nom: creneau.chargeRh.nom,
              prenom: creneau.chargeRh.prenom,
            },  
            
          },
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des créneaux:', error);
      }
    );
  }
  handleEventClick(arg: any): void {
    const dialogRef = this.dialog.open(VisitedetailscollabComponent, {
      width: '400px',
      data: arg.event.extendedProps,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'valider') {
        this.validerCreneau(result.creneauId);
      } else if (result?.action === 'nonValider') {
        this.nonValiderCreneau(result.creneauId, result.justification);
      }
    });
  }
  validerCreneau(idCreneau: number): void {
    this.creneauService.validerCreneau(idCreneau).subscribe({
      next: (response) => {
        this.snackBar.open(response.message || 'Créneau validé avec succès.', 'Fermer', { duration: 3000 });
        this.loadCreneaux(); 
      },
      error: (err) => {
        this.snackBar.open(err.error.message || 'Erreur lors de la validation du créneau.', 'Fermer', { duration: 3000 });
      }
    });
  }

  nonValiderCreneau(idCreneau: number, justification: string): void {
  if (!justification || justification.trim() === '') {
    this.snackBar.open('La justification est obligatoire pour non-valider le créneau.', 'Fermer', { duration: 3000 });
    return;
  }

  this.creneauService.nonValiderCreneau(idCreneau, justification).subscribe({
    next: () => {
      this.snackBar.open('Créneau non validé avec succès.', 'Fermer', { duration: 3000 });
      this.loadCreneaux(); // Recharge la liste des créneaux après la non-validation
    },
    error: (err) => {
      console.log(err);  // Ajoutez ceci pour voir les détails de l'erreur
      if (err.status === 403) {
        this.snackBar.open('Vous n\'avez pas l\'autorisation de non-valider ce créneau.', 'Fermer', { duration: 3000 });
      } else if (err.status === 404) {
        this.snackBar.open('Créneau introuvable.', 'Fermer', { duration: 3000 });
      } else {
        this.snackBar.open(`Erreur lors de la non-validation du créneau: ${err.message}`, 'Fermer', { duration: 3000 });
      }
    }
  });
}

}
