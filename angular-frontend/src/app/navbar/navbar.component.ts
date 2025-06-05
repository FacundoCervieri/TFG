import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Necesario para *ngFor
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userType: 'cliente' | 'empresa' | null = null;
  menuOptions: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí deberías obtener el tipo de usuario real (simulado por ahora)
    this.userType = this.getUserType();
    this.setMenuOptions();
  }

  getUserType(): 'cliente' | 'empresa' | null {
    // Simulación: reemplaza por lógica real (ej. servicio de autenticación)
    return 'cliente'; // o 'empresa' o null
  }

  setMenuOptions() {
    if (this.userType === 'cliente') {
      this.menuOptions = ['Ver reservas', 'Buscar nuevas reservas', 'Cerrar sesión'];
    } else if (this.userType === 'empresa') {
      this.menuOptions = ['Mis reservas', 'Ajustar fechas', 'Cerrar sesión'];
    } else {
      this.menuOptions = [];
    }
  }

  onLogout() {
    // Aquí la lógica para cerrar sesión (ej. borrar token, llamar a backend, etc.)
    console.log('Cerrar sesión');
    this.userType = null;
    this.setMenuOptions(); // Actualizar menú
    this.router.navigate(['/login']);
  }

  onSelectOption(option: string) {
    console.log('Opción seleccionada:', option);
    
    if (option === 'Cerrar sesión') {
      this.onLogout();
      return;
    }

    const routeMap: { [key: string]: string } = {
      'Ver reservas': '/cliente/reservas',
      'Buscar nuevas reservas': '/cliente/buscar',
      'Mis reservas': '/empresa/reservas',
      'Ajustar fechas': '/empresa/ajustar'
    };

    const route = routeMap[option];
    if (route) {
      this.router.navigate([route]);
    }
  }
}