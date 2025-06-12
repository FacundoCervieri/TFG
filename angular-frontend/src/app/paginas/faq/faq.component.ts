// faq.component.ts
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [RouterModule, CommonModule, NavbarComponent],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: '¿Cómo puedo crear una cuenta?',
      answer: 'Puedes crear una cuenta haciendo clic en el botón "Registrarse" en la parte superior de la página. Solo necesitas proporcionar tu email y crear una contraseña segura.',
      isOpen: false
    },
    {
      question: '¿Es gratuito el servicio?',
      answer: 'Ofrecemos un plan gratuito con funcionalidades básicas. También tenemos planes premium con características avanzadas para usuarios que necesiten más funcionalidades.',
      isOpen: false
    },
    {
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Ve a tu perfil, haz clic en "Configuración de cuenta" y selecciona "Cambiar contraseña". Te pediremos tu contraseña actual y la nueva contraseña.',
      isOpen: false
    },
    {
      question: '¿Puedo cancelar mi suscripción en cualquier momento?',
      answer: 'Sí, puedes cancelar tu suscripción en cualquier momento desde la configuración de tu cuenta. Tu acceso premium continuará hasta el final del período facturado.',
      isOpen: false
    },
    {
      question: '¿Cómo contacto con soporte técnico?',
      answer: 'Puedes contactarnos a través del formulario de contacto, enviando un email a soporte@tudominio.com o usando el chat en vivo disponible en la plataforma.',
      isOpen: false
    },
    {
      question: '¿Mis datos están seguros?',
      answer: 'Sí, utilizamos encriptación de grado militar y cumplimos con todas las regulaciones de protección de datos. Nunca compartimos tu información personal con terceros.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}