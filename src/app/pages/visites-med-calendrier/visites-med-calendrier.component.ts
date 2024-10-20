import { Component, OnInit } from '@angular/core';
import { MedecinService } from '../services/medecin.service';
import { CreneauService, Creneau } from '../services/creneau.service';
import { CalendarOptions } from '@fullcalendar/core';  // Import depuis @fullcalendar/core
import dayGridPlugin from '@fullcalendar/daygrid';     // Import du plugin dayGrid
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { VisiteMedDetailsDialogComponent } from '../visite-med-details-dialog/visite-med-details-dialog.component';  // Le popup pour les détails de visite

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

  constructor(private medecinService: MedecinService, private dialog: MatDialog, private creneauService: CreneauService) {}

  ngOnInit(): void {
    // Récupérer les créneaux (visites) du médecin connecté
    this.medecinService.getCreneauxForMedecin().subscribe((creneaux) => {
      const events = creneaux.map(creneau => ({
        title: `${creneau.typeVisite}`,
        start: `${creneau.date}T${creneau.heureDebutVisite}`,
        end: `${creneau.date}T${creneau.heureFinVisite}`,
        classNames: creneau.statusVisite === 'ANNULE' ? 'event-annule' : '',
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
        events
      };
    });
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
}
