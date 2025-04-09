import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoginService {
  autenticar(usuario: string, contrasena: string): Observable<boolean> {
    return of(usuario === 'admin' && contrasena === '123'); 
  }
  
}
