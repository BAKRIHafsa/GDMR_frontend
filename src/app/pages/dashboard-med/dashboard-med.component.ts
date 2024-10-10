import { Component, OnInit } from '@angular/core';
import { DashboardRHService } from '../services/DashboardRH.service';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
import { NotificationService, Notification } from '../services/notification.service';


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
  unreadCount: number = 0;
  notifications: Notification[] = [];

  constructor(
    private dashboardRHService: DashboardRHService,
    private authService: AuthService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
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
    this.loadUnreadNotificationsCount(); 
  }
  loadUnreadNotificationsCount() {
    this.notificationService.getUnreadNotificationsCount().subscribe(
      (count) => {
        this.unreadCount = count;
        this.loadAllNotifications();
      },
      (error) => {
        console.error('Error fetching unread notifications count', error);
      }
    );
  }
  loadAllNotifications(): void {
    this.notificationService.getAllNotifications().subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = this.notifications.filter(notification => !notification.lu).length;
    });
  }

  loadPlannedVisitsForTodayMed() {
    this.dashboardRHService.getPlannedVisitsForTodayMed().subscribe(
      (data) => (this.plannedVisitsMed = data),
      (error) => console.error(error)
    );
  }
  openNotifications(): void {
    const dialogRef = this.dialog.open(NotificationsDialogComponent, {
      width: '400px',
      data: { notifications: this.notifications }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed'); 
    });
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
