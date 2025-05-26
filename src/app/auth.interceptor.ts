// src/app/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token'); // Obtiene el token del localStorage

    // Si la solicitud no es para las rutas de autenticación (login/register)
    // Y si hay un token, clona la solicitud y añade el encabezado Authorization
    if (token && !request.url.includes('/auth/')) { // <--- ¡CLAVE! No añadir el token a rutas de auth
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continúa con la solicitud modificada (o la original)
    return next.handle(request);
  }
}
