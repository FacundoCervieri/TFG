import { Component } from '@angular/core';
import { ToastService } from './shared/services/toast.service';  // Verifica que la ruta sea correcta
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,  // Asegúrate de declarar el componente como Standalone
  imports: [RouterOutlet, ToastComponent, CommonModule],  // Importa lo necesario
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-frontend';

  constructor(private toastService: ToastService) {}

  // ✅ Método para mostrar un toast de éxito
  showSuccessToast() {
    this.toastService.showToast('¡Operación exitosa!', 'success');
  }

  // ✅ Método para mostrar un toast de error
  showErrorToast() {
    this.toastService.showToast('¡Algo salió mal!', 'danger');
  }
}
