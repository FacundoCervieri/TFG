import { Component } from '@angular/core';
import { BaseLayoutComponent } from '../../components/base-layout/base-layout.component';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [BaseLayoutComponent],
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.css']
})
export class PrivacidadComponent {
  fechaActualizacion = '5 de junio de 2025';
  email = 'privacidad@cireste.com';
}