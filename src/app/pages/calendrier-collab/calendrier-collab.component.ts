import { Component, OnInit } from '@angular/core';
import { CreneauService, Creneau } from '../services/creneau.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { MatDialog } from '@angular/material/dialog';
import { VisitedetailscollabComponent } from '../visitedetailscollab/visitedetailscollab.component';

@Component({
  selector: 'app-calendrier-collab',
  templateUrl: './calendrier-collab.component.html',
  styleUrl: './calendrier-collab.component.css',
})
export class CalendrierCollabComponent implements OnInit {
  calendarOptions!: CalendarOptions;

  constructor(
    private creneauService: CreneauService,
    private dialog: MatDialog
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
    this.dialog.open(VisitedetailscollabComponent, {
      width: '400px',
      data: arg.event.extendedProps,
    });
  }
}
