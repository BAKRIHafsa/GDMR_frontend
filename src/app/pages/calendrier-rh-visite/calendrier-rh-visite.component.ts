import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreneauService, Creneau } from '../services/creneau.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { VisiteDetailsDialogComponent } from '../visite-details-dialog/visite-details-dialog.component';


@Component({
  selector: 'app-calendrier-rh-visite',
  templateUrl: './calendrier-rh-visite.component.html',
  styleUrl: './calendrier-rh-visite.component.css',
})
export class CalendrierRhVisiteComponent implements OnInit {
  calendarOptions: any; // Déclarez cette propriété

  constructor(private creneauService: CreneauService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAllCreneaux();
    this.initializeCalendarOptions();
  }

  /* loadCreneauxPlanifies(): void {
    this.creneauService.getAllCreneaux().subscribe(
      (creneaux: Creneau[]) => {
        console.log('Creneaux response:', creneaux); // Check the response data
        this.calendarOptions.events = creneaux.map((creneau) => ({
          title: creneau.typeVisite,
          start: `${creneau.date}T${creneau.heureDebutVisite}`,
          end: `${creneau.date}T${creneau.heureFinVisite}`,
          extendedProps: {
            id: creneau.idCréneau,
            typeVisite: creneau.typeVisite,
            statusVisite: creneau.statusVisite,
            collaborateur: creneau.collaborateur,
            medecin: creneau.medecin,
            chargeRh: creneau.chargeRh,
            motif: creneau.motif,
            justifNonValide: creneau.justifNonValide || 'Non défini',
            justifAnnuleMedecin: creneau.justifAnnuleMedecin || 'Non défini',
            justifAnnuleCollaborateur: creneau.justifAnnuleCollaborateur || 'Non défini',
          },
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des créneaux planifiés:', error);
      }
    );
  }*/
    loadAllCreneaux(): void {
      this.creneauService.getAllCreneaux().subscribe(
        (creneaux: Creneau[]) => {
          console.log('All Creneaux response:', creneaux);
          this.calendarOptions.events = creneaux.map((creneau) => ({
            title: creneau.typeVisite,
            start: this.createDateTime(creneau.date, creneau.heureDebutVisite),
            end: this.createDateTime(creneau.date, creneau.heureFinVisite),
            extendedProps: {
              id: creneau.idCréneau,
              date: creneau.date,
              heureDebutVisite: this.createDateTime(creneau.date, creneau.heureDebutVisite), 
            heureFinVisite: this.createDateTime(creneau.date, creneau.heureFinVisite),
              typeVisite: creneau.typeVisite,
              statusVisite: creneau.statusVisite,
              collaborateur: creneau.collaborateur,
              medecin: creneau.medecin,
              chargeRh: creneau.chargeRh,
              motif: creneau.motif,
              justifNonValide: creneau.justifNonValide || 'Non défini',
              justifAnnuleMedecin: creneau.justifAnnuleMedecin || 'Non défini',
              justifAnnuleCollaborateur: creneau.justifAnnuleCollaborateur || 'Non défini',
            },
          }));
        },
        (error) => {
          console.error('Erreur lors du chargement des visites:', error);
        }
      );
    }
    

    createDateTime(date: string, time: string): Date {
      const [year, month, day] = date.split('-');
      const [hours, minutes] = time.split(':');
  
      return new Date(+year, +month - 1, +day, +hours, +minutes);
    }
 
  

  initializeCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      editable: false,
      selectable: true,
      events: [],
      eventClick: this.handleEventClick.bind(this),
    };
  } 
    

  handleEventClick(event: any): void {
    const creneau = event.event.extendedProps;
    console.log('Données du créneau pour la boîte de dialogue:', creneau); 
    this.dialog.open(VisiteDetailsDialogComponent, {
      data: {
        ...creneau,
        heureDebutVisite: creneau.heureDebutVisite,
        heureFinVisite: creneau.heureFinVisite,
      },
    });
}

}
