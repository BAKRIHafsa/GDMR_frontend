import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { CollaborateurService } from '../services/collaborateur.service';
import { MedecinService } from '../services/medecin.service';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comptes-archives',
  templateUrl: './comptes-archives.component.html',
  styleUrl: './comptes-archives.component.css',
})
export class ComptesArchivesComponent implements OnInit {
  allArchivedUsers$!: Observable<User[]>; //en utilisant ! pour indiquer que vous garantissez qu'elle sera initialisée avant son utilisation
  //allArchivedUsers$: Observable<User[]> = new Observable<User[]>(); // Ensure initialization
  //allArchivedUsers$: Observable<User[]> = of([]); // Initialize with an empty array

  constructor(
    private collaborateurService: CollaborateurService,
    private medecinService: MedecinService
  ) {}

  ngOnInit(): void {
    this.allArchivedUsers$ = forkJoin({
      collaborateursAndChargeRH:
        this.collaborateurService.getArchivedCollaborateursAndChargeRH(),
      medecins: this.medecinService.getArchivedMedecins(),
    }).pipe(
      map(({ collaborateursAndChargeRH, medecins }) => [
        ...collaborateursAndChargeRH,
        ...medecins,
      ])
    );
  }
}
