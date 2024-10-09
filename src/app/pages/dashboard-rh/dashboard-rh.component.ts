import { Component, OnInit } from '@angular/core';
import { DashboardRHService } from '../services/DashboardRH.service';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';
import { AuthService } from '../services/auth.service';
import { NotificationService, Notification } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';



@Component({
  selector: 'app-dashboard-rh',
  templateUrl: './dashboard-rh.component.html',
  styleUrls: ['./dashboard-rh.component.css'],
})
export class DashboardRHComponent implements OnInit {
  userProfile: any = null;
  plannedVisits: number = 0;
  completedVisitsThisWeek: number = 0;
  allVisits: DashboardRHDTO[] = [];
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
      (profile) => {
        this.userProfile = profile;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
    this.loadPlannedVisitsForToday();
    this.loadCompletedVisitsForCurrentWeek();
    this.loadAllVisits();
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
  /* loadAllNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Error fetching notifications', error);
      }
    );
  } */
    loadAllNotifications(): void {
      this.notificationService.getAllNotifications().subscribe(notifications => {
        this.notifications = notifications;
        this.unreadCount = this.notifications.filter(notification => !notification.lu).length;
      });
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

  loadPlannedVisitsForToday() {
    this.dashboardRHService.getPlannedVisitsForToday().subscribe(
      (data) => (this.plannedVisits = data),
      (error) => console.error(error)
    );
  }

  loadCompletedVisitsForCurrentWeek() {
    this.dashboardRHService.getCompletedVisitsForCurrentWeek().subscribe(
      (data) => (this.completedVisitsThisWeek = data),
      (error) => console.error(error)
    );
  }

  loadAllVisits() {
    this.dashboardRHService.getAllVisits().subscribe(
      (data) => (this.allVisits = data),
      (error) => console.error(error)
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
}
