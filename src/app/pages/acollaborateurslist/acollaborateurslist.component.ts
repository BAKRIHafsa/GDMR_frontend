import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollaborateurService } from '../services/collaborateur.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-acollaborateurslist',
  templateUrl: './acollaborateurslist.component.html',
  styleUrl: './acollaborateurslist.component.css',
})
export class AcollaborateurslistComponent implements OnInit {
  activeCollaborateurs: User[] = [];

  constructor(
    private collaborateurService: CollaborateurService //private router: Router
  ) {}

  ngOnInit(): void {
    this.loadActiveCollaborateurs();
  }

  /* loadActiveCollaborateurs(): void {
    this.collaborateurService.getActiveCollaborateursAndChargeRH().subscribe(
      (data: Map<string, User[]>) => {
        this.activeCollaborateurs = data.get('ACTIVE') || [];
      },
      (error) => {
        console.error('Error fetching active collaborateurs', error);
      }
    );
  } */
  loadActiveCollaborateurs(): void {
    this.collaborateurService.getActiveCollaborateursAndChargeRH().subscribe(
      (data: Map<string, User[]>) => {
        this.activeCollaborateurs = data.get('active') || [];
      },
      (error) => {
        console.error('Error fetching active collaborateurs', error);
      }
    );
  }
}
