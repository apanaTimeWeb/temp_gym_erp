// DATA FLOW: API/server state → ManagerStoreProductsThermalReceiptTypes → owning feature UI; UI events/mutations → ManagerStoreProductsThermalReceiptTypes → module API → TanStack Query cache/UI.
// RESPONSIBILITY: Defines the Store-owned thermal receipt data and presentation contract.
export interface ManagerStoreProductsReceiptData {
  gymName: string;
  gymPhone: string;
  receiptNo: string;
  date: string;
  customerName: string;
  items: { name: string; qty?: number; price: number; amount: number }[];
  total: number;
  paymentMethod: string;
}

export interface ManagerStoreProductsThermalReceiptProps {
  data: ManagerStoreProductsReceiptData | null;
}
