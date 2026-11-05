export interface SalesMemberSnapshot {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  planId: string;
  plan?: {
    id: string;
    name: string;
    tier: string;
  };
  status: string;
  joinDate: string;
  expiryDate: string;
  paidAmount: number;
  pendingAmount: number;
  createdAt: string;
}
