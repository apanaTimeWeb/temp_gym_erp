// RESPONSIBILITY: Defines the printable receipt data and component prop contract owned by the Members payment workflow.
export interface ManagerMembersDirectoryReceiptData {
  gymName: string;
  gymPhone: string;
  receiptNo: string;
  date: string;
  customerName: string;
  items: { name: string; qty?: number; price: number; amount: number }[];
  total: number;
  paymentMethod: string;
}
export interface ManagerMembersDirectoryThermalReceiptProps {
  data: ManagerMembersDirectoryReceiptData | null;
}
