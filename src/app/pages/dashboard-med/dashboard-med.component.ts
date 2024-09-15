import { Component, OnInit } from '@angular/core';
import { DashboardRHService } from '../services/DashboardRH.service';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-med',
  templateUrl: './dashboard-med.component.html',
  styleUrl: './dashboard-med.component.css',
})
export class DashboardMedComponent implements OnInit {
  userProfile: any = null;
  plannedVisitsMed: number = 0;
  completedVisitsThisWeekMed: number = 0;
  allVisitsMed: DashboardRHDTO[] = [];

  constructor(
    private dashboardRHService: DashboardRHService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (profile) => {
        this.userProfile = profile;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
    this.loadPlannedVisitsForTodayMed();
    this.loadCompletedVisitsForCurrentWeekMed();
    this.loadAllVisitsMed();
  }

  loadPlannedVisitsForTodayMed() {
    this.dashboardRHService.getPlannedVisitsForTodayMed().subscribe(
      (data) => (this.plannedVisitsMed = data),
      (error) => console.error(error)
    );
  }

  loadCompletedVisitsForCurrentWeekMed() {
    this.dashboardRHService.getCompletedVisitsForCurrentWeekMed().subscribe(
      (data) => (this.completedVisitsThisWeekMed = data),
      (error) => console.error(error)
    );
  }

  loadAllVisitsMed() {
    this.dashboardRHService.getAllVisitsMed().subscribe(
      (data) => (this.allVisitsMed = data),
      (error) => console.error(error)
    );
  }
}
