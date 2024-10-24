import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../services/medecin.service';
import { CreneauService, StatusVisite } from '../services/creneau.service';
import { CalendarOptions } from '@fullcalendar/core';  // Import depuis @fullcalendar/core
import dayGridPlugin from '@fullcalendar/daygrid';     // Import du plugin dayGrid
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { VisiteMedDetailsDialogComponent } from '../visite-med-details-dialog/visite-med-details-dialog.component'; 
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-visites-med-calendrier',
  templateUrl: './visites-med-calendrier.component.html',
  styleUrl: './visites-med-calendrier.component.css'
})
export class VisitesMedCalendrierComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],  // Plugins nécessaires
    events: [],
    eventClick: this.handleEventClick.bind(this)  // Gérer le clic sur un événement
  };

  constructor(private medecinService: MedecinService, private dialog: MatDialog, private creneauService: CreneauService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Récupérer les créneaux (visites) du médecin connecté
    this.medecinService.getCreneauxForMedecin().subscribe((creneaux) => {
      const events = creneaux.map(creneau => ({
        title: `${creneau.typeVisite}`,
        start: `${creneau.date}T${creneau.heureDebutVisite}`,
        end: `${creneau.date}T${creneau.heureFinVisite}`,
        classNames: this.getEventClass(creneau.statusVisite), // Appel à la méthode pour obtenir la classe
        extendedProps: {
          typeVisite: creneau.typeVisite,
          motif: creneau.motif,
          date: creneau.date,
          statusVisite: creneau.statusVisite,
          heureDebutVisite: creneau.heureDebutVisite,
          heureFinVisite: creneau.heureFinVisite,
          collaborateur: creneau.collaborateur,
          documents: creneau.documents,
          idCréneau: creneau.idCréneau  // Mise à jour ici
        }
      }));
      console.log(events);  // Vérifiez ici si les événements ont la classe 'event-annule'


      this.calendarOptions = {
        ...this.calendarOptions,
        events,
        eventClassNames: (arg) => {
          return this.getEventClass(arg.event.extendedProps['statusVisite']);
        }
        
      };
    });
  }

  updateStatus(idCreneau: number, currentStatus: StatusVisite) {
    let newStatus: StatusVisite | null = null;

    if (currentStatus === StatusVisite.PLANIFIE) {
      newStatus = StatusVisite.EN_COURS;
    } else if (currentStatus === StatusVisite.EN_COURS) {
      newStatus = StatusVisite.TERMINE;
    }

    if (newStatus) {
      this.creneauService.updateCreneauStatusEtEnvoiNotif(idCreneau, newStatus).subscribe(() => {
        this.snackBar.open(`Statut mis à jour avec succès à ${newStatus}.`, 'Fermer', { duration: 3000 });
        this.ngOnInit(); // Rafraîchit le calendrier après la mise à jour
      }, 
      (error) => {
        this.snackBar.open('Erreur lors de la mise à jour du statut.', 'Fermer', { duration: 3000 });
      });
    }
  }

  // Gérer le clic sur un événement
  handleEventClick(info: any) {
    const visiteData = info.event.extendedProps;  // Les détails de la visite sont dans extendedProps
    const dialogRef= this.dialog.open(VisiteMedDetailsDialogComponent, {
      width: '400px',
      data: {
        title: info.event.title,
        idCréneau: visiteData.idCréneau,  // Utilisation de idCréneau
        typeVisite: visiteData.typeVisite,
        date: visiteData.date,
        heureDebut: visiteData.heureDebutVisite,
        heureFin: visiteData.heureFinVisite,
        motif: visiteData.motif,
        statut: visiteData.statusVisite,
        documents: visiteData.documents,  // Passer les documents au dialogue
        collaborateur: visiteData.collaborateur
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'annuler') {
        // Handle the cancellation logic here
        const motifAnnulation = result.motifAnnulation;
        const idCréneau = result.idCréneau;
        
        this.creneauService.annulerCreneau(idCréneau, motifAnnulation).subscribe(() => {
          // Optionally, refresh the calendar or show a success message
          this.ngOnInit(); // Refresh the calendar after cancellation
        });
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
      default:
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
    console.log('Class for event:', className); // Log pour déboguer
    return className;
  }
  
}
