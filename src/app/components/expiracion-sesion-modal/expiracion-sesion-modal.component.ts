import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-expiracion-sesion-modal',
  templateUrl: './expiracion-sesion-modal.component.html',
  styleUrls: ['./expiracion-sesion-modal.component.scss']
})
export class ExpiracionSesionModalComponent {
  password: string = '';
  mensajeError: string = '';
  usuarioInicial: string = '';

  @Output() reintentar = new EventEmitter<string>();

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.usuarioInicial = username ? username.charAt(0).toUpperCase() : '?';
  }

  enviar(): void {
    this.reintentar.emit(this.password);
  }

  mostrarError(): void {
    this.mensajeError = 'Contraseña incorrecta. Por favor, intenta de nuevo.';
  }
}

