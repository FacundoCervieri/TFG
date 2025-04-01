import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { CommonModule } from '@angular/common';
import { Toast } from '../interfaces/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    // Subscribirse a toastState$ para actualizar la vista cuando cambien los toasts
    this.toastService.toastState$.subscribe((toasts: Toast[]) => {
      this.toasts = toasts;
    });
  }

  removeToast(toastId: number) {
    this.toastService.removeToast(toastId);
  }
}
