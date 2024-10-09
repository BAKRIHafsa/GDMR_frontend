import { Component, Inject } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-notifications-dialog',
  templateUrl: './notifications-dialog.component.html',
  styleUrl: './notifications-dialog.component.css'
})
export class NotificationsDialogComponent {
  unreadCount: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { notifications: Notification[] },
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<NotificationsDialogComponent>
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
      this.unreadCount = this.data.notifications.filter(n => !n.lu).length;
      if (this.unreadCount > 0) {
        this.unreadCount--;
      }

      const hasUnreadNotifications = this.data.notifications.some(n => !n.lu);

      // Si toutes les notifications sont lues, rafraîchissez la page
      if (!hasUnreadNotifications) {
        window.location.reload();
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}