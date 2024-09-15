import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DisponibiliteService,
  Disponibilite,
} from '../services/disponibilite.service';
import { MedecinService } from '../services/medecin.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { User } from '../models/user.model';

@Component({
  selector: 'app-medecin-details',
  templateUrl: './medecin-details.component.html',
  styleUrl: './medecin-details.component.css',
})
export class MedecinDetailsComponent implements OnInit {
  medecin: User | undefined;
  disponibilites: Disponibilite[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
  };

  constructor(
    private route: ActivatedRoute,
    private medecinService: MedecinService,
    private disponibiliteService: DisponibiliteService
  ) {}

  ngOnInit(): void {
    const medecinId = Number(this.route.snapshot.paramMap.get('id'));

    this.medecinService.getUser(medecinId).subscribe((medecin) => {
      this.medecin = medecin;
      this.loadDisponibilites(medecinId);
    });
  }

  loadDisponibilites(medecinId: number): void {
    this.disponibiliteService
      .getDisponibilitesByMedecin(medecinId)
      .subscribe((disponibilites) => {
        this.disponibilites = disponibilites;
        this.calendarOptions.events = disponibilites.map((d) => ({
          title: `de ${d.heuredebut?.substring(0, 5)} à ${d.heurefin?.substring(
            0,
            5
          )}`,
          start: `${d.date}T${d.heuredebut}`,
          end: `${d.date}T${d.heurefin}`,
          id: d.id !== undefined ? d.id.toString() : 'unknown',
        }));
      });
  }
}
