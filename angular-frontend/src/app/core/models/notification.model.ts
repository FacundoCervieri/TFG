export interface Notification {
  id: number;
  clientId: number;
  message: string;
  sendDate: Date;
  read: boolean;
}