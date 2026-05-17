import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/user.model';

const TOKEN_KEY = 'pam_access_token';

/**
 * AuthService — manages JWT token lifecycle.
 *
 * SECURITY NOTE: localStorage is used for simplicity.
 * For production hardening, prefer httpOnly cookies to mitigate XSS risk.
 * Set the cookie on the server side and rely on SameSite=Strict + Secure flags.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiBaseUrl}/auth`;

  // Reactive signal-based auth state (Angular 18+ signals)
  private _token = signal<string | null>(this.loadToken());
  readonly isAuthenticated = computed(() => !!this._token());
  readonly token = this._token.asReadonly();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.persistToken(response.access_token);
      }),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private persistToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
  }

  private clearToken(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
  }

  private loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
}
