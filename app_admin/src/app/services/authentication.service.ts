import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly apiBase = 'http://localhost:3000/api';
  private readonly tokenKey = 'travlr-token';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  /** Safely decode JWT payload */
  private decodeJwtPayload<T = any>(token: string): T | null {
    try {
      const part = token.split('.')[1];
      if (!part) return null;
      // Use globalThis.atob when available (browser); otherwise bail out gracefully
      const atobFn = (globalThis as any)?.atob as ((s: string) => string) | undefined;
      if (!atobFn) return null;
      // Handle URL-safe base64
      const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atobFn(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

  /** Get the current user info from the stored token (or null if missing/invalid/expired) */
  getUser(): { email: string; name: string; _id?: string } | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = this.decodeJwtPayload<{ email: string; name: string; _id?: string; exp?: number }>(token);
    if (!payload) return null;

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      this.logout();
      return null;
    }

    return { email: payload.email, name: payload.name, _id: payload._id };
  }

  private urlEncode(body: Record<string, string>): string {
    return new HttpParams({ fromObject: body }).toString();
  }

  private formHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  }

  /** Save & get token */
  private saveToken(token: string): void {
    this.storage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    return this.storage.getItem(this.tokenKey);
  }
  logout(): void {
    this.storage.removeItem(this.tokenKey);
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Register */
  register(user: User): Observable<AuthResponse> {
    const body = this.urlEncode({
      name: user.name,
      email: user.email,
      password: user.password
    });
    return this.http
      .post<AuthResponse>(`${this.apiBase}/register`, body, { headers: this.formHeaders() })
      .pipe(map((res) => { if (res.token) this.saveToken(res.token); return res; }));
  }

  /** Login */
  login(credentials: Pick<User, 'email' | 'password'>): Observable<AuthResponse> {
    const body = this.urlEncode({
      email: credentials.email,
      password: credentials.password
    });
    return this.http
      .post<AuthResponse>(`${this.apiBase}/login`, body, { headers: this.formHeaders() })
      .pipe(map((res) => { if (res.token) this.saveToken(res.token); return res; }));
  }
}