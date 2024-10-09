import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService, Notification } from '../services/notification.service';

@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrl: './notifications-dialog.component.css'
})
export class NotificationsDialogComponent {
  unreadCount: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { notifications: Notification[] },
    private notificationService: NotificationService
  ) {
    // Initialisation du nombre de notifications non lues
    this.unreadCount = this.data.notifications.filter(notification => !notification.lu).length;
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      const notification = this.data.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.lu = true;
      }
      if (this.unreadCount > 0) {
        this.unreadCount--;
      }
    });
  }
}