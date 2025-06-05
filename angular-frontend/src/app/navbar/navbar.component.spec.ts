import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cliente menu options', () => {
    component.userType = 'cliente';
    component.setMenuOptions();
    expect(component.menuOptions).toEqual(['Ver reservas', 'Buscar nuevas reservas', 'Cerrar sesión']);
  });

  it('should set empresa menu options', () => {
    component.userType = 'empresa';
    component.setMenuOptions();
    expect(component.menuOptions).toEqual(['Mis reservas', 'Ajustar fechas', 'Cerrar sesión']);
  });

  it('should clear menu options if userType null', () => {
    component.userType = null;
    component.setMenuOptions();
    expect(component.menuOptions).toEqual([]);
  });

  it('should call onLogout when clicking Cerrar sesión', () => {
    spyOn(component, 'onLogout');
    component.userType = 'cliente';
    component.setMenuOptions();
    component.onSelectOption('Cerrar sesión');
    expect(component.onLogout).toHaveBeenCalled();
  });

});
