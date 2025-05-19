export interface User {
  id: number;
  email: string;
  name: string;
  password?: string; // Optional for forms
}

export interface Company extends User {
  description: string;
  address: string;
  phone: string;
  registrationDate: Date;
}

export interface Client extends User {
  phone: string;
  registrationDate: Date;
}