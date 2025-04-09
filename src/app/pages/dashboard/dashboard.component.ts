import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  urlSeleccionada: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  navegar(url: string): void {
    this.urlSeleccionada = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesion');
    window.location.href = '/';
  }
}
