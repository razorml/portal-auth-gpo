import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { decodeToken } from './helpers/jwt.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    try {
      const payload = decodeToken(token);
      const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos

      if (payload.exp && now > payload.exp) {
        console.warn('Token expirado');
        localStorage.clear(); // limpia sesión
        this.router.navigate(['/']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token inválido');
      this.router.navigate(['/']);
      return false;
    }
  }
}
