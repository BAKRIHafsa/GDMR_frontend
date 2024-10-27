import { Component, OnInit } from '@angular/core';
import { CreneauService, Creneau, StatusVisite } from '../services/creneau.service';
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
          className: this.getEventClass(creneau.statusVisite),
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
            medecin: creneau.medecin ? {
              idUser: creneau.medecin.idUser,
              nom: creneau.medecin.nom,
              prenom: creneau.medecin.prenom,
              siteTravail: creneau.medecin.siteTravail,
              experience: creneau.medecin.experience,
              qualification: creneau.medecin.qualification,
              specialite: creneau.medecin.specialite,
            } : null, // Set to null if medecin is null
            collaborateur: creneau.collaborateur ? {
              idUser: creneau.collaborateur.idUser,
              nom: creneau.collaborateur.nom,
              prenom: creneau.collaborateur.prenom,
            } : null, // Set to null if collaborateur is null
            chargeRh: creneau.chargeRh ? {
              idUser: creneau.chargeRh.idUser,
              nom: creneau.chargeRh.nom,
              prenom: creneau.chargeRh.prenom,
            } : null, // Set to null if chargeRh is null
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
      }else if (result?.action === 'annuler') {
        this.annulerCreneau(result.creneauId, result.motifAnnulation);
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

annulerCreneau(idCreneau: number, motifAnnulation: string): void {
  this.creneauService.annulerCreneau(idCreneau, motifAnnulation).subscribe({
    next: (response) => {
      this.snackBar.open(response.message || 'Créneau annulé avec succès.', 'Fermer', { duration: 3000 });
      this.loadCreneaux(); 
    },
    error: (err) => {
      this.snackBar.open(err.error.message || 'Erreur lors de l\'annulation du créneau.', 'Fermer', { duration: 3000 });
    }
  });
}

mapStringToStatusVisite(status: string): StatusVisite {
  switch (status) {
    case 'PLANIFIE':
      return StatusVisite.PLANIFIE;
    case 'EN_COURS':
      return StatusVisite.EN_COURS;
    case 'TERMINE':
      return StatusVisite.TERMINE;
    case 'ANNULE':
      return StatusVisite.ANNULE;
    case 'NON_VALIDE':
        return StatusVisite.NON_VALIDE;
    case 'VALIDE':
        return StatusVisite.VALIDE;
    case 'EN_ATTENTE_CREATION_CRENEAU':
        return StatusVisite.EN_ATTENTE_CREATION_CRENEAU;
    default:
      console.error(`Statut visite inconnu: ${status}`); // Log the unknown status
      throw new Error('Statut visite inconnu');
  }
}


getEventClass(status: string): string {
  const statusVisite = this.mapStringToStatusVisite(status);
  let className = '';
  switch (statusVisite) {
    case StatusVisite.TERMINE:
      className = 'event-termine';
      break;
    case StatusVisite.EN_COURS:
      className = 'event-en-cours';
      break;
    case StatusVisite.PLANIFIE:
      className = 'event-planifie';
      break;
    case StatusVisite.ANNULE:
      className = 'event-annule';
      break;
    default:
      className = '';
  }
  console.log('Class for event:', className); // Ajoutez ce log
  return className;
}

}
