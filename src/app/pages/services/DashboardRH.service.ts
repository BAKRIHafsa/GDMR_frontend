import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardRHDTO } from '../models/DashboardRHDTO.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardRHService {
  private apiUrl = 'http://localhost:8080/api'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) {}

  getPlannedVisitsForToday(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/chargéRH/planned-today-count`);
  }

  getCompletedVisitsForCurrentWeek(): Observable<number> {
    return this.http.get<number>(
      `${this.apiUrl}/chargéRH/completed-week-count`
    );
  }

  getAllVisits(): Observable<DashboardRHDTO[]> {
    return this.http.get<DashboardRHDTO[]>(`${this.apiUrl}/chargéRH/all`);
  }

  getPlannedVisitsForTodayCollab(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/collab/planned-today-count`);
  }

  getCompletedVisitsForCurrentWeekCollab(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/collab/completed-week-count`);
  }

  getAllVisitsCollab(): Observable<DashboardRHDTO[]> {
    return this.http.get<DashboardRHDTO[]>(`${this.apiUrl}/collab/all`);
  }

  getPlannedVisitsForTodayMed(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/med/planned-today-count`);
  }

  getCompletedVisitsForCurrentWeekMed(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/med/completed-week-count`);
  }

  getAllVisitsMed(): Observable<DashboardRHDTO[]> {
    return this.http.get<DashboardRHDTO[]>(`${this.apiUrl}/med/all`);
  }
}
