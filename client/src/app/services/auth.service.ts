import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  signup(email: string, password: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { email, password, username });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  setUser(token: string, username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', username);
  }

  getUsername(): string | null {
    return localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
