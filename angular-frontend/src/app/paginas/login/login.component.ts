import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showLogin = true;
  
  // Datos del formulario
  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '', confirmPassword: '' };
  
  // Estados de error y éxito
  loginErrors: any = {};
  registerErrors: any = {};
  loginSuccess = false;
  registerSuccess = false;
  
  // Control de visibilidad de contraseñas
  loginPasswordFieldType = 'password';
  registerPasswordFieldType = 'password';
  
  // Estados de carga
  isLoginLoading = false;
  isRegisterLoading = false;

  // URL base de la API
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  toggleForms() {
    this.showLogin = !this.showLogin;
    this.clearMessages();
    this.clearForms();
  }

  togglePasswordVisibility(form: 'login' | 'register') {
    if (form === 'login') {
      this.loginPasswordFieldType =
        this.loginPasswordFieldType === 'password' ? 'text' : 'password';
    } else {
      this.registerPasswordFieldType =
        this.registerPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }

  clearMessages() {
    this.loginErrors = {};
    this.registerErrors = {};
    this.loginSuccess = false;
    this.registerSuccess = false;
  }

  clearForms() {
    this.loginData = { email: '', password: '' };
    this.registerData = { name: '', email: '', password: '', confirmPassword: '' };
  }

  onLogin() {
    this.clearMessages();
    
    // Validación del formulario
    if (!this.validateLoginForm()) {
      return;
    }

    this.isLoginLoading = true;

    // Llamada a la API - ajusta la URL según tu backend
    this.http.post(`${this.apiUrl}/api/login`, this.loginData).subscribe({
      next: (response: any) => {
        this.isLoginLoading = false;
        this.loginSuccess = true;
        
        // Guardar token si existe
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
        
        // Guardar datos del usuario si existen
        if (response.user) {
          localStorage.setItem('userData', JSON.stringify(response.user));
        }

        // Redirigir después de un breve delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      },
      error: (error: HttpErrorResponse) => {
        this.isLoginLoading = false;
        this.handleLoginError(error);
      },
    });
  }

  onRegister() {
    this.clearMessages();
    
    // Validación del formulario
    if (!this.validateRegisterForm()) {
      return;
    }

    this.isRegisterLoading = true;

    // Preparar datos para envío (sin confirmPassword)
    const registerPayload = {
      name: this.registerData.name,
      email: this.registerData.email,
      password: this.registerData.password
    };

    this.http.post(`${this.apiUrl}/api/register`, registerPayload).subscribe({
      next: (response: any) => {
        this.isRegisterLoading = false;
        this.registerSuccess = true;
        
        // Limpiar formulario después del registro exitoso
        this.clearForms();
        
        // Cambiar al formulario de login después de un delay
        setTimeout(() => {
          this.toggleForms();
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        this.isRegisterLoading = false;
        this.handleRegisterError(error);
      },
    });
  }

  private validateLoginForm(): boolean {
    let isValid = true;

    if (!this.loginData.email) {
      this.loginErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!this.validateEmail(this.loginData.email)) {
      this.loginErrors.email = 'Formato de email inválido';
      isValid = false;
    }

    if (!this.loginData.password) {
      this.loginErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (this.loginData.password.length < 6) {
      this.loginErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    return isValid;
  }

  private validateRegisterForm(): boolean {
    let isValid = true;

    if (!this.registerData.name) {
      this.registerErrors.name = 'El nombre es obligatorio';
      isValid = false;
    } else if (this.registerData.name.length < 2) {
      this.registerErrors.name = 'El nombre debe tener al menos 2 caracteres';
      isValid = false;
    }

    if (!this.registerData.email) {
      this.registerErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!this.validateEmail(this.registerData.email)) {
      this.registerErrors.email = 'Formato de email inválido';
      isValid = false;
    }

    if (!this.registerData.password) {
      this.registerErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (this.registerData.password.length < 6) {
      this.registerErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (!this.registerData.confirmPassword) {
      this.registerErrors.confirmPassword = 'Debes confirmar la contraseña';
      isValid = false;
    } else if (this.registerData.password !== this.registerData.confirmPassword) {
      this.registerErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    return isValid;
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.loginErrors.password = 'Email o contraseña incorrectos';
    } else if (error.status === 422 && error.error.errors) {
      // Manejar errores de validación del backend
      const backendErrors = error.error.errors;
      if (backendErrors.email) {
        this.loginErrors.email = backendErrors.email[0];
      }
      if (backendErrors.password) {
        this.loginErrors.password = backendErrors.password[0];
      }
    } else if (error.status === 0) {
      this.loginErrors.password = 'Error de conexión. Verifica tu conexión a internet.';
    } else {
      this.loginErrors.password = 'Error del servidor. Inténtalo más tarde.';
    }
  }

  private handleRegisterError(error: HttpErrorResponse) {
    if (error.status === 422 && error.error.errors) {
      // Manejar errores de validación del backend
      const backendErrors = error.error.errors;
      if (backendErrors.name) {
        this.registerErrors.name = backendErrors.name[0];
      }
      if (backendErrors.email) {
        this.registerErrors.email = backendErrors.email[0];
      }
      if (backendErrors.password) {
        this.registerErrors.password = backendErrors.password[0];
      }
    } else if (error.status === 409) {
      this.registerErrors.email = 'Este email ya está registrado';
    } else if (error.status === 0) {
      this.registerErrors.email = 'Error de conexión. Verifica tu conexión a internet.';
    } else {
      this.registerErrors.email = 'Error del servidor. Inténtalo más tarde.';
    }
  }

  showForgotPassword() {
    const email = prompt('Ingresa tu email para recuperar tu contraseña:');
    if (email && this.validateEmail(email)) {
      // Aquí deberías hacer una llamada real a tu API
      this.http.post(`${this.apiUrl}/api/forgot-password`, { email }).subscribe({
        next: () => {
          alert(`Se ha enviado un enlace de recuperación a ${email}`);
        },
        error: () => {
          alert('Error al enviar el email de recuperación. Inténtalo más tarde.');
        }
      });
    } else if (email) {
      alert('Por favor ingresa un email válido');
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }
}