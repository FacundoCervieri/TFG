import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface ServiceRegistration {
  id?: number;
  userType: 'particular' | 'empresario';
  serviceType: string;
  description: string;
  contact: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceRegistrationService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    private authService: AuthService
  ) {}

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  registerService(serviceData: Omit<ServiceRegistration, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Observable<ServiceRegistration> {
    return this.http.post<ServiceRegistration>(
      `${this.apiUrl}/api/services`, 
      serviceData, 
      this.getHttpOptions()
    );
  }

  getMyServices(): Observable<ServiceRegistration[]> {
    return this.http.get<ServiceRegistration[]>(
      `${this.apiUrl}/api/my-services`, 
      this.getHttpOptions()
    );
  }

  getAllServices(): Observable<ServiceRegistration[]> {
    return this.http.get<ServiceRegistration[]>(
      `${this.apiUrl}/api/services`
    );
  }

  getServiceById(id: number): Observable<ServiceRegistration> {
    return this.http.get<ServiceRegistration>(
      `${this.apiUrl}/api/services/${id}`, 
      this.getHttpOptions()
    );
  }

  updateService(id: number, serviceData: Partial<ServiceRegistration>): Observable<ServiceRegistration> {
    return this.http.put<ServiceRegistration>(
      `${this.apiUrl}/api/services/${id}`, 
      serviceData, 
      this.getHttpOptions()
    );
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/api/services/${id}`, 
      this.getHttpOptions()
    );
  }

  searchServices(filters: {
    serviceType?: string;
    userType?: string;
    search?: string;
  }): Observable<ServiceRegistration[]> {
    let params = new URLSearchParams();
    
    if (filters.serviceType) params.append('serviceType', filters.serviceType);
    if (filters.userType) params.append('userType', filters.userType);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = `${this.apiUrl}/api/services/search${queryString ? '?' + queryString : ''}`;
    
    return this.http.get<ServiceRegistration[]>(url);
  }
}