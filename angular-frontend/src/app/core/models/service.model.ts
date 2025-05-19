export interface Service {
  id: number;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  companyId: number;
}
