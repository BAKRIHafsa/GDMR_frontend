import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getUnreadNotificationsCount(idUser: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-unread/${idUser}`);
  }

  markAsRead(notificationId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/mark-as-read`, {
      notificationId,
    });
  }
}
