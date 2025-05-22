import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from '../login/login.service';
import { ExpiracionSesionModalComponent } from 'src/app/components/expiracion-sesion-modal/expiracion-sesion-modal.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(ExpiracionSesionModalComponent)
  modalRef!: ExpiracionSesionModalComponent;

  urlSeleccionada: SafeResourceUrl | null = null;
  usuario: string = '';
  tiempoRestante: string = '';
  mostrarModal: boolean = false;
  isAdmin: boolean = false;
  permisos: any[] = [];

  private intervalo: any;
  private exp!: number;
  private tokenInterval!: any;

  constructor(
    private sanitizer: DomSanitizer,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('usuario') || '';
    const rolesRaw = localStorage.getItem('roles');
    const isAdminFlag = localStorage.getItem('isAdmin');

    if (token) {
      const { exp }: any = jwtDecode(token);
      this.exp = exp;
      this.iniciarContador();
    }

    this.usuario = username;
    this.isAdmin = isAdminFlag === 'true';

    if (rolesRaw) {
      const roles = JSON.parse(rolesRaw);
      this.permisos = roles.flatMap((rol: any) => rol.permisos || []);
    }

    if (this.exp) {
      this.iniciarCuentaRegresiva(this.exp);
    }
  }

  iniciarContador(): void {
    this.tokenInterval = setInterval(() => {
      const ahora = Math.floor(Date.now() / 1000);
      const tiempo = this.exp - ahora;

      if (tiempo <= 0) {
        clearInterval(this.tokenInterval);
        this.mostrarModal = true;
      } else {
        const minutos = Math.floor(tiempo / 60);
        const segundos = tiempo % 60;
        this.tiempoRestante = `${minutos}m ${segundos}s`;
      }
    }, 1000);
  }

  iniciarCuentaRegresiva(expTimestamp: number): void {
    this.intervalo = setInterval(() => {
      const tiempoActual = Math.floor(Date.now() / 1000);
      const tiempoFaltante = expTimestamp - tiempoActual;

      if (tiempoFaltante <= 0) {
        this.tiempoRestante = 'Sesión expirada';
        clearInterval(this.intervalo);
      } else {
        const minutos = Math.floor(tiempoFaltante / 60);
        const segundos = tiempoFaltante % 60;
        this.tiempoRestante = `${minutos}m ${segundos}s`;
      }
    }, 1000);
  }

  navegar(url: string): void {
    this.urlSeleccionada = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigateByUrl(environment.login);
  }

  reintentarAutenticacion(password: string): void {
    this.loginService.autenticar(this.usuario, password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        const { exp }: any = jwtDecode(response.token);
        this.exp = exp;
        this.mostrarModal = false;
        this.iniciarContador();
      },
      () => {
        if (this.modalRef) {
          this.modalRef.mostrarError();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    if (this.tokenInterval) {
      clearInterval(this.tokenInterval);
    }
  }
}
