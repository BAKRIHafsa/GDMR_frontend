import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreneauService, Creneau } from '../services/creneau.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendrier-rh-visite',
  templateUrl: './calendrier-rh-visite.component.html',
  styleUrl: './calendrier-rh-visite.component.css',
})
export class CalendrierRhVisiteComponent implements OnInit {
  calendarOptions: any; // Déclarez cette propriété

  constructor(private creneauService: CreneauService) {}

  ngOnInit(): void {
    this.loadCreneaux();
    this.initializeCalendarOptions();
  }

  loadCreneaux(): void {
    this.creneauService.getCreneaux().subscribe(
      (creneaux: Creneau[]) => {
        this.calendarOptions.events = creneaux.map((creneau) => ({
          title: creneau.typeVisite,
          start: `${creneau.date}T${creneau.heureDebutVisite}`,
          end: `${creneau.date}T${creneau.heureFinVisite}`,
          extendedProps: {
            id: creneau.idCréneau,
          },
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des créneaux:', error);
      }
    );
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
      editable: true,
      selectable: true,
      events: [],
    };
  }
}
