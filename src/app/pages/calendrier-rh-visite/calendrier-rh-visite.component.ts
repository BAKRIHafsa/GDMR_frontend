import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreneauService, Creneau, StatusVisite } from '../services/creneau.service';
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
          this.calendarOptions.events = creneaux.map((creneau) => {
            // Check if creneau is incomplete (status is EN_ATTENTE_CREATION or missing times)
            const isPending = creneau.statusVisite === 'EN_ATTENTE_CREATION_CRENEAU' || !creneau.heureDebutVisite || !creneau.heureFinVisite;
    
            return {
              title: isPending ? 'Pending Visit' : creneau.typeVisite,
              start: isPending ? null : this.createDateTime(creneau.date, creneau.heureDebutVisite),
              end: isPending ? null : this.createDateTime(creneau.date, creneau.heureFinVisite),
              classNames: isPending ? 'event-pending' : this.getEventClass(creneau.statusVisite),
              extendedProps: {
                id: creneau.idCréneau,
                date: creneau.date,
                heureDebutVisite: creneau.heureDebutVisite,
                heureFinVisite: creneau.heureFinVisite,
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
            };
          });
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
      case 'EN_ATTENTE_VALIDATION':
      return StatusVisite.EN_ATTENTE_VALIDATION;
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
    case StatusVisite.NON_VALIDE:
      className = 'event-non-valide';
      break;
    default:
      className = '';
  }
  console.log('Class for event:', className); // Ajoutez ce log
  return className;
}
}
