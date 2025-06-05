import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustarFechasComponent } from './ajustar-fechas.component';

describe('AjustarFechasComponent', () => {
  let component: AjustarFechasComponent;
  let fixture: ComponentFixture<AjustarFechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjustarFechasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustarFechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
