export interface Promotion {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discountPercentage: number;
  companyId: number;
}
