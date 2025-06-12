import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-registro-servicio',
  templateUrl: './registro-servicio.component.html',
  styleUrls: ['./registro-servicio.component.css']
})
export class RegistroServicioComponent {
  registroForm: FormGroup;
  currentStep: number = 1;
  totalSteps: number = 4;

  tiposUsuario = [
    { value: 'particular', label: 'Particular', icon: '👤', description: 'Ofrezco servicios como persona individual' },
    { value: 'empresa', label: 'Empresa', icon: '🏢', description: 'Represento una empresa o negocio' }
  ];

  tiposServicio = [
    { value: 'belleza', label: 'Belleza y Estética', icon: '💄' },
    { value: 'salud', label: 'Salud y Bienestar', icon: '🏥' },
    { value: 'educacion', label: 'Educación y Formación', icon: '📚' },
    { value: 'tecnologia', label: 'Tecnología e IT', icon: '💻' },
    { value: 'hogar', label: 'Hogar y Mantenimiento', icon: '🏠' },
    { value: 'eventos', label: 'Eventos y Celebraciones', icon: '🎉' },
    { value: 'transporte', label: 'Transporte y Logística', icon: '🚗' },
    { value: 'consultoria', label: 'Consultoría y Asesoría', icon: '💼' },
    { value: 'arte', label: 'Arte y Creatividad', icon: '🎨' },
    { value: 'deportes', label: 'Deportes y Fitness', icon: '⚽' },
    { value: 'otros', label: 'Otros Servicios', icon: '⭐' }
  ];

  diasSemana = [
    { value: 'lunes', label: 'Lunes' },
    { value: 'martes', label: 'Martes' },
    { value: 'miercoles', label: 'Miércoles' },
    { value: 'jueves', label: 'Jueves' },
    { value: 'viernes', label: 'Viernes' },
    { value: 'sabado', label: 'Sábado' },
    { value: 'domingo', label: 'Domingo' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registroForm = this.formBuilder.group({
      // Paso 1: Tipo de usuario
      tipoUsuario: ['', Validators.required],
      
      // Paso 2: Tipo de servicio
      tipoServicio: ['', Validators.required],
      nombreServicio: ['', [Validators.required, Validators.minLength(3)]],
      
      // Paso 3: Descripción
      descripcionCorta: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      descripcionDetallada: ['', [Validators.required, Validators.minLength(50)]],
      precio: ['', Validators.required],
      duracion: ['', Validators.required],
      
      // Paso 4: Disponibilidad y contacto
      diasDisponibles: [[], Validators.required],
      horarioInicio: ['', Validators.required],
      horarioFin: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required]
    });
  }

  nextStep(): void {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.registroForm.get('tipoUsuario')?.valid || false;
      case 2:
        return (this.registroForm.get('tipoServicio')?.valid && 
                this.registroForm.get('nombreServicio')?.valid) || false;
      case 3:
        return (this.registroForm.get('descripcionCorta')?.valid && 
                this.registroForm.get('descripcionDetallada')?.valid &&
                this.registroForm.get('precio')?.valid &&
                this.registroForm.get('duracion')?.valid) || false;
      case 4:
        return (this.registroForm.get('diasDisponibles')?.valid && 
                this.registroForm.get('horarioInicio')?.valid &&
                this.registroForm.get('horarioFin')?.valid &&
                this.registroForm.get('telefono')?.valid &&
                this.registroForm.get('email')?.valid &&
                this.registroForm.get('direccion')?.valid &&
                this.registroForm.get('ciudad')?.valid) || false;
      default:
        return false;
    }
  }

  selectTipoUsuario(tipo: string): void {
    this.registroForm.patchValue({ tipoUsuario: tipo });
  }

  selectTipoServicio(tipo: string): void {
    this.registroForm.patchValue({ tipoServicio: tipo });
  }

  toggleDia(dia: string): void {
    const diasActuales = this.registroForm.get('diasDisponibles')?.value || [];
    const index = diasActuales.indexOf(dia);
    
    if (index > -1) {
      diasActuales.splice(index, 1);
    } else {
      diasActuales.push(dia);
    }
    
    this.registroForm.patchValue({ diasDisponibles: diasActuales });
  }

  isDiaSelected(dia: string): boolean {
    const diasSeleccionados = this.registroForm.get('diasDisponibles')?.value || [];
    return diasSeleccionados.includes(dia);
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      console.log('Formulario enviado:', this.registroForm.value);
      // Aquí harías la llamada al servicio para guardar los datos
      alert('¡Servicio registrado exitosamente!');
      this.router.navigate(['/']);
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  getProgressPercentage(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }
}