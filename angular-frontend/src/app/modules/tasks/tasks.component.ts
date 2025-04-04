import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../shared/services/task-service.service';
import { Task } from '../../shared/interfaces/task';
import * as router from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
selector: 'app-tasks',
standalone: true,
imports: [CommonModule, router.RouterModule, ReactiveFormsModule],
templateUrl: './tasks.component.html',
styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
tasks: Task[] = [];
filteredTasks: Task[] = []; 
userTask!: FormGroup; 
searchControl = new FormControl('');
private readonly destroy$ = new Subject<void>();

constructor(private taskService: TaskService, private fb: FormBuilder) {}

ngOnInit(): void {
this.loadTasks();
// Define el formulario
this.userTask = this.fb.group({
id: ['0'],
title: ['', [Validators.required, Validators.minLength(3)]],
describe: ['', Validators.required], 
completed: [false],
});

// Configuracion de la barra de búsqueda
this.searchControl.valueChanges
.pipe(
debounceTime(300), // Espera 300ms para evitar búsquedas constantes
distinctUntilChanged(), // Evita repetir búsquedas si el valor no cambia
takeUntil(this.destroy$) // Se desuscribe cuando el componente se destruye
)
.subscribe((searchTerm) => {
this.filterTasks(searchTerm ?? ''); // Manejar null como cadena vacía
});
}

loadTasks(): void {
this.taskService.getTasks().subscribe(
(tasks) => {
this.tasks = tasks;
this.filteredTasks = tasks; // Inicialmente, mostrar todas las tareas
},
(error) => console.error('Error al obtener tareas:', error)
);
}

addTask(): void {
if (this.userTask.invalid) return;

const newTask: Task = {
id: 0, 
title: this.userTask.value.title,
description: this.userTask.value.describe, 
completed: false
};

this.taskService.addTask(newTask).subscribe(() => {
this.loadTasks();
this.userTask.reset({ completed: false });
});
}

toggleTask(task: Task): void {
task.completed = !task.completed;
this.taskService.updateTask(task).subscribe(() => this.loadTasks());
}

deleteTask(id: number): void {
this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
}

filterTasks(searchTerm: string): void {
this.filteredTasks = this.tasks.filter((task) =>
task.title.toLowerCase().includes(searchTerm.toLowerCase())
);
}

ngOnDestroy(): void {
this.destroy$.next();
this.destroy$.complete();
}
}


