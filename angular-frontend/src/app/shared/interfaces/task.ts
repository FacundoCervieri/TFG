// src/app/shared/interfaces/task.ts

export interface Task {
  id: number;
  title: string;
  description: string;  // Agregamos la propiedad 'description'
  completed: boolean;
}
