export interface LoyaltyHistory {
  id: number;
  clientId: number;
  pointsAccumulated: number;
  canceledAppointments: number;
  totalAppointments: number;
}