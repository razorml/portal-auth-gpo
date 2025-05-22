import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { decodeToken } from '../../helpers/jwt.helper';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  autenticar(usuario: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login`, {
      username: usuario,
      password: contrasena
    }).pipe(
      tap(response => {
        if (response.token) {
          const token = response.token;
          const payload = decodeToken(token);

          //Guardar todos los datos relevantes en localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('exp', payload.exp.toString());
          localStorage.setItem('usuario', `${usuario}`);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          localStorage.setItem('isAdmin', response.isAdmin.toString());
        }
      })
    );
  }
}
