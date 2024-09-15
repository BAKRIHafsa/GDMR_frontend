import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  DisponibiliteService,
  Disponibilite,
} from '../services/disponibilite.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction';
import { AddDisponibiliteDialogComponent } from '../add-disponibilite-dialog/add-disponibilite-dialog.component';

@Component({
  selector: 'app-calendrier-med',
  templateUrl: './calendrier-med.component.html',
  styleUrl: './calendrier-med.component.css',
})
export class CalendrierMedComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  ajoutDisponibiliteForm: FormGroup;
  medecinId: number = 0;

  constructor(
    private disponibiliteService: DisponibiliteService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.ajoutDisponibiliteForm = this.fb.group({
      date: [''],
      heureDebut: [''],
      heureFin: [''],
    });
  }

  /* ngOnInit(): void {
    this.loadDisponibilites();
  } */
  ngOnInit(): void {
    this.disponibiliteService.getCurrentMedecinId().subscribe({
      next: (id) => {
        this.medecinId = id;
        this.loadDisponibilites();
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'ID du médecin", err);
      },
    });
  }

  /* loadDisponibilites(): void {
    this.disponibiliteService
      .getDisponibilitesForCurrentMedecin()
      .subscribe((medecinId) => {
        this.disponibiliteService
          .getDisponibilitesByMedecin(medecinId)
          .subscribe((disponibilites) => {
            this.calendarOptions.events = disponibilites.map((d) => ({
              title: `Disponibilité`,
              start: `${d.date}T${d.heureDebut}`,
              end: `${d.date}T${d.heureFin}`,
              id: d.id.toString(),
            }));
          });
      });
  } */
  /* loadDisponibilites(): void {
    if (this.medecinId) {
      this.disponibiliteService
        .getDisponibilitesByMedecin(this.medecinId)
        .subscribe((disponibilites) => {
          console.log(disponibilites); // Vérifiez ici les données reçues
          this.calendarOptions.events = disponibilites.map((d) => ({
            title: `Disponibilité`,
            start: `${d.date}T${d.heureDebut}`,
            end: `${d.date}T${d.heureFin}`,
            id: d.id !== undefined ? d.id.toString() : 'unknown', // Valeur par défaut si `id` est `undefined`
          }));
        });
    }
  } */
  /* loadDisponibilites(): void {
    if (this.medecinId) {
      this.disponibiliteService
        .getDisponibilitesByMedecin(this.medecinId)
        .subscribe((disponibilites) => {
          this.calendarOptions.events = disponibilites
            .filter((d) => d.heuredebut !== null && d.heurefin !== null) // Filtre les disponibilités sans heure
            .map((d) => ({
              title: `Disponibilité`,
              start: `${d.date}T${d.heuredebut}`,
              end: `${d.date}T${d.heurefin}`,
              id: d.id !== undefined ? d.id.toString() : 'unknown',
            }));
          console.log(this.calendarOptions.events); // Vérifiez ici si les événements sont correctement assignés
        });
    }
  } */
  loadDisponibilites(): void {
    if (this.medecinId) {
      this.disponibiliteService
        .getDisponibilitesByMedecin(this.medecinId)
        .subscribe((disponibilites) => {
          this.calendarOptions.events = disponibilites.map((d) => ({
            title: `de ${d.heuredebut?.substring(
              0,
              5
            )} à ${d.heurefin?.substring(0, 5)}`, // Formattage de l'heure pour le titre
            start: `${d.date}T${d.heuredebut}`,
            end: `${d.date}T${d.heurefin}`,
            id: d.id !== undefined ? d.id.toString() : 'unknown',
          }));
        });
    }
  }

  /* handleDateClick(arg: any): void {
    // Afficher un dialogue pour ajouter une nouvelle disponibilité
    const dialogRef = this.dialog.open(AddDisponibiliteDialogComponent, {
      width: '250px',
      data: { date: arg.dateStr },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.disponibiliteService.ajouterDisponibilite(result).subscribe(() => {
          this.loadDisponibilites(); // Recharger les disponibilités après ajout
        });
      }
    });
  } */
  handleDateClick(arg: any): void {
    const dialogRef = this.dialog.open(AddDisponibiliteDialogComponent, {
      width: '250px',
      data: { date: arg.dateStr },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const disponibilite: Disponibilite = {
          date: result.date,
          heuredebut: result.heuredebut,
          heurefin: result.heurefin,
          medecin: { idUser: this.medecinId },
        };

        this.disponibiliteService
          .ajouterDisponibilite(disponibilite)
          .subscribe(() => {
            this.loadDisponibilites(); // Recharger les disponibilités après ajout
          });
      }
    });
  }

  handleEventClick(arg: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette disponibilité ?')) {
      const id = Number(arg.event.id);
      this.disponibiliteService.supprimerDisponibilite(id).subscribe(() => {
        this.loadDisponibilites();
      });
    }
  }

  deleteDisponibilite(id: number): void {
    this.disponibiliteService.supprimerDisponibilite(id).subscribe(() => {
      this.loadDisponibilites(); // Recharger les disponibilités après suppression
    });
  }
}
