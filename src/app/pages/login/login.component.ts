import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario = '';
  contrasena = '';
  errorAutenticacion: string | null = null;

  constructor(private router: Router,
    private loginService: LoginService
  ) {}

  //Olvido de contraseña
  irOlvido(): void {
    this.router.navigate(['/olvido-clave']);
  }

  //iniciar sesion
  onSubmit(): void {
    this.errorAutenticacion = null; // reinicia mensaje
    this.loginService.autenticar(this.usuario, this.contrasena).subscribe({
      next: (response) => {
        if (response && response.autenticado) {
          localStorage.setItem('sesion', 'true');
          this.router.navigate(['/dashboard']);
        } else {
          this.errorAutenticacion = 'Usuario o contraseña incorrectos.';
        }
      },
      error: (err) => {
        this.errorAutenticacion = 'Usuario o contraseña incorrectos.';
        console.error(err);
      }
    });
  } 
  
}
