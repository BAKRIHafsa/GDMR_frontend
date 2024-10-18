import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface Notification {
  id: number;
  message: string;
  lu: boolean;
  dateEnvoi: Date;  
  destinataire: User;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getUnreadNotificationsCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-unread`);
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/all`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/mark-as-read`, {
      notificationId
    });
  }

  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.baseUrl}/markAllAsRead`, {});
  }
  
}
