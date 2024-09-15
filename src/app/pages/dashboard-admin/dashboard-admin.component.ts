import { Component, OnInit } from '@angular/core';
import { DashboardRHService } from '../services/DashboardRH.service';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent implements OnInit {
  userProfile: any = null;
  plannedVisitsCollab: number = 0;
  completedVisitsThisWeekCollab: number = 0;
  allVisitsCollab: DashboardRHDTO[] = [];

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
    this.loadPlannedVisitsForTodayCollab();
    this.loadCompletedVisitsForCurrentWeekCollab();
    this.loadAllVisitsCollab();
  }

  loadPlannedVisitsForTodayCollab() {
    this.dashboardRHService.getPlannedVisitsForTodayCollab().subscribe(
      (data) => (this.plannedVisitsCollab = data),
      (error) => console.error(error)
    );
  }

  loadCompletedVisitsForCurrentWeekCollab() {
    this.dashboardRHService.getCompletedVisitsForCurrentWeekCollab().subscribe(
      (data) => (this.completedVisitsThisWeekCollab = data),
      (error) => console.error(error)
    );
  }

  loadAllVisitsCollab() {
    this.dashboardRHService.getAllVisitsCollab().subscribe(
      (data) => (this.allVisitsCollab = data),
      (error) => console.error(error)
    );
  }
}
