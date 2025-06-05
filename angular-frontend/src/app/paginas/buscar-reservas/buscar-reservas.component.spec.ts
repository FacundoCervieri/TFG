import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarReservasComponent } from './buscar-reservas.component';

describe('BuscarReservasComponent', () => {
  let component: BuscarReservasComponent;
  let fixture: ComponentFixture<BuscarReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
