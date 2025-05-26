import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../environments/environment";

const BASE_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, { email }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  create(email: string): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, { email }).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
