import { Component, OnInit } from '@angular/core';
import { DashboardRHService } from '../services/DashboardRH.service';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';
import { AuthService, UserProfile } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dashboard-collab',
  templateUrl: './dashboard-collab.component.html',
  styleUrl: './dashboard-collab.component.css',
})
export class DashboardCollabComponent implements OnInit {
  user: User | null = null;
  plannedVisitsCollab: number = 0;
  completedVisitsThisWeekCollab: number = 0;
  allVisitsCollab: DashboardRHDTO[] = [];
  unreadCount: number = 0;

  constructor(
    private dashboardRHService: DashboardRHService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (profile: User) => {
        this.user = profile;
        if (profile) {
          this.loadUnreadNotificationsCount(profile.idUser);
        }
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );

    this.loadPlannedVisitsForTodayCollab();
    this.loadCompletedVisitsForCurrentWeekCollab();
    this.loadAllVisitsCollab();
  }

  loadUnreadNotificationsCount(userId: number) {
    this.notificationService.getUnreadNotificationsCount(userId).subscribe(
      (count) => {
        this.unreadCount = count; // Update the unread count
      },
      (error) => {
        console.error('Error fetching unread notifications count', error);
      }
    );
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

  markNotificationsAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.unreadCount--;
    });
  }
  openNotifications(): void {
    console.log('Afficher les notifications...');
  }
  
}
