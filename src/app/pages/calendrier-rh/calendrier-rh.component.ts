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
  DisponibiliteDetails,
  CreneauModal,
} from '../services/disponibilite.service';
import { CreneauService, CreneauCreationRH } from '../services/creneau.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { CreneauModalComponent } from '../creneau-modal/creneau-modal.component';
import { DisponibiliteDetailComponent } from '../disponibilite-detail/disponibilite-detail.component';

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
    eventClick: this.handleEventClick.bind(this),
    timeZone: 'local'

    
  };
  disponibilites: DisponibiliteDetails[] = [];
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
    this.loadDisponibilites();
    this.loadCollaborateurs();
  }
  loadDisponibilites() {
    this.disponibiliteService.getDisponibilites().subscribe((disponibilites: DisponibiliteDetails[]) => {
      this.disponibilites = disponibilites;
      this.calendarOptions.events = disponibilites.map((disponibilite: DisponibiliteDetails) => ({
        start: disponibilite.date + 'T' + disponibilite.heuredebut,
        end: disponibilite.date + 'T' + disponibilite.heurefin,
        title: 'Disponibilité',
        extendedProps: { disponibiliteId: disponibilite.id } // Ajoutez l'ID de la disponibilité ici
      }));
    });
  }

  loadCollaborateurs() {
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
  /* handleEventClick(clickInfo: any) {
    console.log('Clicked event info:', clickInfo);
    console.log('Current disponibilites:', this.disponibilites);
    

    const disponibilite = this.disponibilites.find(d => 
      d.date === clickInfo.event.start.toISOString().split('T')[0] &&
      d.heuredebut === clickInfo.event.start.toISOString().split('T')[1].substring(0, 5) &&
      d.heurefin === clickInfo.event.end.toISOString().split('T')[1].substring(0, 5)
    );

    if (disponibilite) {
      this.dialog.open(DisponibiliteDetailComponent, {
        width: '400px',
        data: disponibilite
      });
    }
    else {
      // Optionally, handle the case where no availability is found
      console.warn('No availability found for the clicked event.');
    }
  } */
    /* handleEventClick(clickInfo: any) {
      console.log('Clicked event info:', clickInfo);
      console.log('Current disponibilites:', this.disponibilites);
    
      // Extract date and time from the clicked event
      const clickedDate = clickInfo.event.start.toISOString().split('T')[0]; // YYYY-MM-DD
      const clickedHeureDebut = clickInfo.event.start.toISOString().split('T')[1].substring(0, 8) + '.000000'; // HH:mm:ss.SSSSSS
      const clickedHeureFin = clickInfo.event.end.toISOString().split('T')[1].substring(0, 8) + '.000000'; // HH:mm:ss.SSSSSS

      console.log('Clicked Date:', clickedDate);
  console.log('Clicked Start Time:', clickedHeureDebut);
  console.log('Clicked End Time:', clickedHeureFin);
    
      const disponibilite = this.disponibilites.find(d => 
        d.date === clickedDate &&
        d.heuredebut.substring(0, 5) === clickedHeureDebut &&
        d.heurefin.substring(0, 5) === clickedHeureFin
      );
    
      if (disponibilite) {
        this.dialog.open(DisponibiliteDetailComponent, {
          width: '400px',
          data: disponibilite
        });
      } else {
        console.warn('No availability found for the clicked event.');
      }
    } */
      handleEventClick(clickInfo: any) {
        //console.log('Clicked event info:', clickInfo);
        //console.log('Current disponibilites:', this.disponibilites);
      
        const clickedDisponibiliteId = clickInfo.event.extendedProps.disponibiliteId;
        const disponibilite = this.disponibilites.find(d => d.id === clickedDisponibiliteId);
    
        if (disponibilite) {
          //console.log('Found disponibilite:', disponibilite);
          this.dialog.open(DisponibiliteDetailComponent, {
            width: '400px',
            data: disponibilite
          });
        } else {
          console.warn('No availability found for the clicked event.');
        }
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