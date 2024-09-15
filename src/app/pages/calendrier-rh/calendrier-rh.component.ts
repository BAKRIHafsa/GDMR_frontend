import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  DisponibiliteService,
  Disponibilite,
  CreneauModal,
} from '../services/disponibilite.service';
import { CreneauService, CreneauCreationRH } from '../services/creneau.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { CreneauModalComponent } from '../creneau-modal/creneau-modal.component';
@Component({
  selector: 'app-calendrier-rh',
  templateUrl: './calendrier-rh.component.html',
  styleUrls: ['./calendrier-rh.component.css'],
})
export class CalendrierRHComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.handleDateClick.bind(this),
  };
  disponibilites: Disponibilite[] = [];
  /* newCreneau: CreneauCreationRH = {
    date: '',
    heureDebutVisite: '',
    heureFinVisite: '',
    typeVisite: 'VISITE_ANNUELLE',
    chargeRh: { idUser: 0 },
    collaborateursIds: [],
  }; */
  collaborateurs: User[] = [];

  constructor(
    private disponibiliteService: DisponibiliteService,
    private creneauService: CreneauService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.disponibiliteService
      .getDisponibilites()
      .subscribe((disponibilites: Disponibilite[]) => {
        this.disponibilites = disponibilites;
        const events = disponibilites.map((disponibilite: Disponibilite) => ({
          start: disponibilite.date + 'T' + disponibilite.heuredebut,
          end: disponibilite.date + 'T' + disponibilite.heurefin,
          title: 'Disponibilité',
        }));

        /* this.calendarOptions = {
          initialView: 'dayGridMonth',
          events: events,
        }; */
        this.calendarOptions.events = events;
      });
    this.authService.getCollaborateurs().subscribe((collaborateurs: User[]) => {
      this.collaborateurs = collaborateurs;
    });
  }
  handleDateClick(arg: any) {
    const selectedDate = arg.dateStr;
    const heuresDisponibles = this.disponibilites.filter(
      (d) => d.date === selectedDate
    );

    // Ouvrir la fenêtre modale avec les disponibilités et le formulaire de création de créneau
    const dialogRef = this.dialog.open(CreneauModalComponent, {
      width: '500px',
      data: {
        date: selectedDate,
        heuresDisponibles: heuresDisponibles,
        heureDebutCreneau: '',
        heureFinCreneau: '',
        typeVisite: 'VISITE_ANNUELLE',
        collaborateursIds: [],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.creneauService.creerCreneau(result).subscribe(
          (response) => {
            console.log("Réponse de l'API :", response);
            this.snackBar.open('Créneau créé avec succès', 'Fermer', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Erreur lors de la création du créneau :', error);
            this.snackBar.open(
              'Erreur lors de la création du créneau',
              'Fermer',
              {
                duration: 3000,
              }
            );
          }
        );
      }
    });
  }

  /* reerCreneau() {
    // Assurez-vous que les heures sont au format correct (HH:mm)
    const formatTime = (timeString: string): string => {
      const [hours, minutes] = timeString.split(':');
      return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    };

    // Assurez-vous que la date est dans le bon format (yyyy-MM-dd)
    const formatDate = (dateString: string): string => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Préparez les données pour l'API
    const creneau: CreneauCreationRH = {
      ...this.newCreneau,
      date: formatDate(this.newCreneau.date), // Formatage de la date
      heureDebutVisite: formatTime(this.newCreneau.heureDebutVisite),
      heureFinVisite: formatTime(this.newCreneau.heureFinVisite),
    };

    this.creneauService.creerCreneau(creneau).subscribe(
      (response) => {
        console.log("Réponse de l'API :", response);
        this.snackBar.open('Créneau créé avec succès', 'Fermer', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Erreur lors de la création du créneau :', error);
        this.snackBar.open('Erreur lors de la création du créneau', 'Fermer', {
          duration: 3000,
        });
      }
    );
  } */
}
