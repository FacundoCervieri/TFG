import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-terminos',
  imports: [RouterModule, CommonModule, NavbarComponent],
  standalone: true,
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent {
  secciones = [
    {
      titulo: '1. Aceptación de los términos',
      contenido: 'Al utilizar Cireste, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo, por favor no utilices la plataforma.'
    },
    {
      titulo: '2. Uso permitido',
      contenido: 'Solo puedes utilizar la plataforma para fines legales y conforme a las leyes vigentes.'
    },
    {
      titulo: '3. Cuenta de usuario',
      contenido: 'Debes mantener la confidencialidad de tu cuenta. Eres responsable de toda la actividad bajo tu cuenta.'
    },
    {
      titulo: '4. Cambios en los términos',
      contenido: 'Cireste puede modificar estos términos en cualquier momento. Te notificaremos si hay cambios importantes.'
    }
  ];
}
