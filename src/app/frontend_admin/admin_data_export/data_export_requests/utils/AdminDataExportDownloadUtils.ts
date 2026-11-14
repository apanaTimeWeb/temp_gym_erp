// RESPONSIBILITY: Data generation and browser download helpers for Admin Data Export.

export type DataType = 'Members' | 'Payments' | 'Attendance' | 'Staff' | 'Full Report';
export type ExportFormat = 'CSV' | 'Excel (.xlsx)' | 'PDF';
export type TargetGym = 'All Gyms' | 'Andheri East' | 'Bandra West' | 'Powai' | 'Thane';

export const DATA_TYPES: DataType[] = ['Members', 'Payments', 'Attendance', 'Staff', 'Full Report'];
export const EXPORT_FORMATS: ExportFormat[] = ['CSV', 'Excel (.xlsx)', 'PDF'];
export const TARGET_GYMS: TargetGym[] = ['All Gyms', 'Andheri East', 'Bandra West', 'Powai', 'Thane'];

export function generateDataPayload(dataType: DataType, gym: TargetGym, fromDate?: string, toDate?: string) {
  const gymFilter = gym === 'All Gyms' ? 'Andheri East' : gym;
  if (dataType === 'Members') {
    const headers = ['Member ID', 'Name', 'Phone', 'Email', 'Gym Branch', 'Membership Plan', 'Status', 'Join Date'];
    const rows = [
      ['MEM-001', 'Neha Verma', '+91 98765 11111', 'neha.v@example.com', gymFilter, 'Gold Annual', 'ACTIVE', '2026-02-04'],
      ['MEM-002', 'Arjun Rao', '+91 98765 22222', 'arjun.r@example.com', gymFilter, 'Premium Monthly', 'ACTIVE', '2026-07-11'],
      ['MEM-003', 'Karan Patel', '+91 98765 33333', 'karan.p@example.com', gymFilter, 'Silver Monthly', 'EXPIRED', '2025-09-01'],
      ['MEM-004', 'Isha Desai', '+91 98765 44444', 'isha.d@example.com', gymFilter, 'Gold Annual', 'ACTIVE', '2026-03-12'],
      ['MEM-005', 'Vikram Sen', '+91 98765 55555', 'vikram.s@example.com', gymFilter, 'Silver Monthly', 'EXPIRED', '2025-08-09'],
    ];
    return { headers, rows };
  }
  if (dataType === 'Payments') {
    const headers = ['Invoice No', 'Member Name', 'Gym Branch', 'Amount (INR)', 'Payment Mode', 'Status', 'Date'];
    const rows = [
      ['INV-1041', 'Neha Verma', gymFilter, '12000', 'UPI', 'SUCCESS', '2026-10-15'],
      ['INV-1042', 'Arjun Rao', gymFilter, '2500', 'Card', 'SUCCESS', '2026-10-18'],
      ['INV-1043', 'Pooja Sharma', gymFilter, '15000', 'Net Banking', 'SUCCESS', '2026-10-20'],
      ['INV-1044', 'Isha Desai', gymFilter, '12000', 'UPI', 'SUCCESS', '2026-10-25'],
    ];
    return { headers, rows };
  }
  if (dataType === 'Attendance') {
    const headers = ['Record ID', 'Person Name', 'Role', 'Gym Branch', 'Check-In', 'Check-Out', 'Duration', 'Status', 'Date'];
    const rows = [
      ['ATT-201', 'Neha Verma', 'Member', gymFilter, '07:15 AM', '08:45 AM', '90 mins', 'PRESENT', '2026-11-12'],
      ['ATT-202', 'Rohit Mehta', 'Manager', gymFilter, '06:00 AM', '03:00 PM', '9 hrs', 'PRESENT', '2026-11-12'],
      ['ATT-203', 'Priya Shah', 'Trainer', gymFilter, '02:00 PM', '10:00 PM', '8 hrs', 'PRESENT', '2026-11-12'],
      ['ATT-204', 'Arjun Rao', 'Member', gymFilter, '06:30 PM', '08:00 PM', '90 mins', 'PRESENT', '2026-11-12'],
    ];
    return { headers, rows };
  }
  if (dataType === 'Staff') {
    const headers = ['Staff ID', 'Full Name', 'Role', 'Gym Branch', 'Contact Phone', 'Shift', 'Monthly Salary (INR)', 'Status'];
    const rows = [
      ['STF-01', 'Rohit Mehta', 'Branch Manager', gymFilter, '+91 98765 00001', 'Morning', '55000', 'ACTIVE'],
      ['STF-02', 'Priya Shah', 'Senior Trainer', gymFilter, '+91 98765 00002', 'Evening', '42000', 'ACTIVE'],
      ['STF-03', 'Aman Khan', 'Front Desk Executive', gymFilter, '+91 98765 00003', 'Morning', '28000', 'ACTIVE'],
      ['STF-04', 'Sahil Joshi', 'Branch Manager', gymFilter, '+91 98765 00004', 'Morning', '52000', 'ACTIVE'],
    ];
    return { headers, rows };
  }
  // Full Report
  const headers = ['Metric', 'Category', 'Gym Branch', 'Period', 'Value', 'Status'];
  const rows = [
    ['Total Active Members', 'Members', gymFilter, `${fromDate || ''} to ${toDate || ''}`, '1,160', 'OPTIMAL'],
    ['Gross Collections', 'Revenue', gymFilter, `${fromDate || ''} to ${toDate || ''}`, 'INR 4,85,000', 'VERIFIED'],
    ['Average Attendance Rate', 'Operations', gymFilter, `${fromDate || ''} to ${toDate || ''}`, '78.4%', 'NORMAL'],
    ['Staff Count', 'HR', gymFilter, `${fromDate || ''} to ${toDate || ''}`, '53', 'ACTIVE'],
    ['Operating Expenses', 'Finance', gymFilter, `${fromDate || ''} to ${toDate || ''}`, 'INR 2,24,000', 'LOGGED'],
  ];
  return { headers, rows };
}

export function triggerDownload(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
