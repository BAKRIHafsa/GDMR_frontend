import { Component, OnInit } from '@angular/core';
import { DashboardRHService } from '../services/DashboardRH.service';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
import { NotificationService,Notification } from '../services/notification.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent implements OnInit {
  user: User | null = null;
  plannedVisitsCollab: number = 0;
  completedVisitsThisWeekCollab: number = 0;
  allVisitsCollab: DashboardRHDTO[] = [];
  unreadCount: number = 0;
  notifications: Notification[] = [];


  constructor(
    private dashboardRHService: DashboardRHService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialog: MatDialog


  ) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe(
      (profile: User) => {
        this.user = profile;
        if (profile) {
          this.loadUnreadNotificationsCount();
        }
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );

    this.loadPlannedVisitsForTodayCollab();
    this.loadCompletedVisitsForCurrentWeekCollab();
    this.loadAllVisitsCollab();
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
  loadAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  }

  openNotifications(): void {
    const dialogRef = this.dialog.open(NotificationsDialogComponent, {
      width: '400px',
      data: { notifications: this.notifications }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
