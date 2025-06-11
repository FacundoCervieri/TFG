import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [NavbarComponent, RouterModule, CommonModule],
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {
  helpCategories = [
    {
      icon: '🚀',
      title: 'Primeros Pasos',
      description: 'Todo lo que necesitas saber para comenzar',
      articles: [
        'Crear tu primera cuenta',
        'Configurar tu perfil',
        'Navegación básica',
        'Funcionalidades principales'
      ]
    },
    {
      icon: '⚙️',
      title: 'Configuración',
      description: 'Personaliza tu experiencia',
      articles: [
        'Configurar notificaciones',
        'Gestionar privacidad',
        'Cambiar contraseña',
        'Configurar preferencias'
      ]
    },
    {
      icon: '🔧',
      title: 'Resolución de Problemas',
      description: 'Soluciones a problemas comunes',
      articles: [
        'No puedo iniciar sesión',
        'Problemas de conexión',
        'Error en la carga de datos',
        'Problemas de rendimiento'
      ]
    },
    {
      icon: '💰',
      title: 'Facturación',
      description: 'Información sobre pagos y suscripciones',
      articles: [
        'Planes disponibles',
        'Métodos de pago',
        'Cancelar suscripción',
        'Historial de facturas'
      ]
    },
    {
      icon: '🔒',
      title: 'Seguridad',
      description: 'Mantén tu cuenta segura',
      articles: [
        'Autenticación de dos factores',
        'Crear contraseñas seguras',
        'Reconocer intentos de phishing',
        'Reportar actividad sospechosa'
      ]
    },
    {
      icon: '📱',
      title: 'Aplicación Móvil',
      description: 'Usar la app en tu móvil',
      articles: [
        'Descargar la aplicación',
        'Sincronizar datos',
        'Notificaciones push',
        'Funciones offline'
      ]
    }
  ];

  searchQuery = '';
  
  popularArticles = [
    'Cómo cambiar mi contraseña',
    'Configurar notificaciones',
    'Cancelar mi suscripción',
    'Recuperar mi cuenta',
    'Contactar soporte técnico'
  ];

  onSearch() {
    if (this.searchQuery.trim()) {
      // Aquí iría la lógica de búsqueda
      console.log('Buscando:', this.searchQuery);
    }
  }
}