import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiracionSesionModalComponent } from './expiracion-sesion-modal.component';

describe('ExpiracionSesionModalComponent', () => {
  let component: ExpiracionSesionModalComponent;
  let fixture: ComponentFixture<ExpiracionSesionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiracionSesionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiracionSesionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
