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

  constructor(private router: Router,
    private loginService: LoginService
  ) {}

  //Olvido de contraseña
  irOlvido(): void {
    this.router.navigate(['/olvido-clave']);
  }

  //iniciar sesion
  onSubmit(): void {
    this.loginService.autenticar(this.usuario, this.contrasena).subscribe(correcto => {
      if (correcto) {
        //Guardar inicio de sesion
        localStorage.setItem('sesion', 'true');
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
  
  
}
