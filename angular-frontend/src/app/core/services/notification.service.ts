import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8000/api/notifications';
  private notificationSubject = new Subject<string>();
  notifications = this.notificationSubject.asObservable();

  constructor(private http: HttpClient) { }

  getNotificationsByClient(clientId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/client/${clientId}`);
  }

  markAsRead(id: number): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}/read`, {});
  }

  // UI notification (toast/alert)
  showNotification(message: string): void {
    this.notificationSubject.next(message);
  }
}