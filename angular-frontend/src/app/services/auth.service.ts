import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  // Agrega otros campos que devuelva tu backend
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Verificar si hay datos de usuario guardados al inicializar el servicio
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
      } catch (error) {
        // Si hay error al parsear, limpiar datos
        this.clearAuth();
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/login`, { email, password });
  }

  register(userData: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, userData);
  }

  setAuthData(response: any): void {
    // Guardar token
    if (response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    // Guardar datos del usuario
    if (response.user) {
      localStorage.setItem('userData', JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
    }
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  private clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    return !!(token && userData);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar si el token sigue siendo válido
  verifyToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/verify-token`);
  }

  // Método para refrescar el token si tu backend lo soporta
  refreshToken(): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/refresh-token`, {});
  }
}