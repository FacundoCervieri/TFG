import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../interfaces/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastState = new BehaviorSubject<Toast[]>([]);

  toastState$ = this.toastState.asObservable();
  private toastId = 0;

  showToast(bodyKey: string, type: 'success' | 'danger' | 'info', duration: number = 2000) {
    if (this.toasts.length >= 3) {
      this.toasts.shift();
      this.toastState.next([...this.toasts]);
    }

    const newToast: Toast = {
      id: this.toastId++,
      show: false,
      body: bodyKey,
      type,
    };

    this.toasts.push(newToast);
    this.toastState.next([...this.toasts]);

    setTimeout(() => {
      newToast.show = true;
      this.toastState.next([...this.toasts]);
    }, 10);

    setTimeout(() => {
      newToast.show = false;
      this.toastState.next([...this.toasts]);

      setTimeout(() => this.removeToast(newToast.id), 300);
    }, duration);
  }

  removeToast(toastId: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== toastId);
    this.toastState.next([...this.toasts]);
  }
}
