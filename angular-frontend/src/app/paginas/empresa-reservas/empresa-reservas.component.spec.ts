import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaReservasComponent } from './empresa-reservas.component';

describe('EmpresaReservasComponent', () => {
  let component: EmpresaReservasComponent;
  let fixture: ComponentFixture<EmpresaReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
