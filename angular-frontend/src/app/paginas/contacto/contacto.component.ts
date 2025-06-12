import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [NavbarComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Respuesta en 24 horas',
      value: 'soporte@tudominio.com',
      action: 'mailto:soporte@tudominio.com'
    },
    {
      icon: '📞',
      title: 'Teléfono',
      description: 'Lun-Vie 9:00-18:00',
      value: '+34 900 123 456',
      action: 'tel:+34900123456'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Disponible ahora',
      value: 'Iniciar chat',
      action: '#'
    },

  ];

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Formulario enviado:', this.contactForm);
      alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.contactForm.nombre &&
      this.contactForm.email &&
      this.contactForm.asunto &&
      this.contactForm.mensaje
    );
  }

  private resetForm() {
    this.contactForm = {
      nombre: '',
      email: '',
      asunto: '',
      mensaje: ''
    };
  }
}
