export type AppointmentStatus = 'pending' | 'confirmed' | 'canceled' | 'completed';

export interface Appointment {
  id: number;
  date: Date;
  time: string;
  status: AppointmentStatus;
  serviceId: number;
  clientId: number;
  
  // Optional properties for UI display
  serviceName?: string;
  clientName?: string;
}