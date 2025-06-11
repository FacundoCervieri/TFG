import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [NavbarComponent, RouterModule, CommonModule],
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.css']
})
export class PrivacidadComponent {
  lastUpdated = 'Enero 2025';
  
  tableOfContents = [
    { id: 'introduccion', title: 'Introducción' },
    { id: 'informacion-recopilada', title: 'Información que Recopilamos' },
    { id: 'uso-informacion', title: 'Cómo Usamos tu Información' },
    { id: 'compartir-informacion', title: 'Compartir Información' },
    { id: 'seguridad', title: 'Seguridad de los Datos' },
    { id: 'cookies', title: 'Cookies y Tecnologías Similares' },
    { id: 'derechos', title: 'Tus Derechos' },
    { id: 'cambios', title: 'Cambios en esta Política' },
    { id: 'contacto', title: 'Contacto' }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}