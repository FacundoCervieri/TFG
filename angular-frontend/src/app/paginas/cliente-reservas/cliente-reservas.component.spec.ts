import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteReservasComponent } from './cliente-reservas.component';

describe('ClienteReservasComponent', () => {
  let component: ClienteReservasComponent;
  let fixture: ComponentFixture<ClienteReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteReservasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
