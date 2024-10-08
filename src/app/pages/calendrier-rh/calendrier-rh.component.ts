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
  currentUser!: User;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    timeZone: 'local'

    
  };
  disponibilites: DisponibiliteDetails[] = [];
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
    //this.loadCollaborateurs();
    this.loadCurrentUser();

  }
  loadCurrentUser(): void {
    this.authService.getCurrentUserId().subscribe(
      user => this.currentUser = user,
      error => console.error('Erreur lors du chargement de l\'utilisateur courant:', error)
    );
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

  /* loadCollaborateurs() {
    this.authService.getCollaborateurs().subscribe((collaborateurs: User[]) => {
      this.collaborateurs = collaborateurs;
    });
  }  */
    loadCollaborateurs(date: string, heureDebut: string, heureFin: string): void {
      this.authService.getCollaborateursAV(date, heureDebut, heureFin).subscribe(
        (collaborateurs: User[]) => {
          this.collaborateurs = collaborateurs;
        },
        (error) => {
          console.error('Erreur lors du chargement des collaborateurs:', error);
        }
      );
    }
    
  handleDateClick(arg: any) {
    const selectedDate = arg.dateStr;
    const heuresDisponibles = this.disponibilites.filter(
      (d) => d.date === selectedDate
    );

    const dialogRef = this.dialog.open(CreneauModalComponent, {
      width: '500px',
      data: {
        date: selectedDate,
        heuresDisponibles: heuresDisponibles,
        heureDebutCreneau: '',
        heureFinCreneau: '',
        typeVisite: 'VISITE_ANNUELLE',
        collaborateurId: null,
        dateCreation:new Date().toISOString().split('T')[0],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.creneauService.creerCreneau(result).subscribe(
          (response) => {
            console.log('Creneau successfully created:', response);
            this.snackBar.open(response, 'Fermer', { duration: 3000 });
          },
          (error) => {
            console.error('Erreur lors de la création du créneau:', error);
            this.snackBar.open('Erreur lors de la création du créneau', 'Fermer', { duration: 3000 });
          }
        );
      }
    });
  }
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
}