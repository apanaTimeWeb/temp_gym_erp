import { MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline.constants';
import type { Inquiry, InquiryStats } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';

/**
 * @description Provides the ManagerInquiriesPipelineMockData implementation for the inquiries module.
 * @dependencies @/app/frontend_manager/manager_inquiries_crm/manager_inquiries_types/ManagerInquiriesPipelineTypes
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-001',
    name: 'Rahul Sharma',
    phone: '+91 9876543210',
    email: 'rahul.s@example.com',
    interest: 'Personal Training',
    status: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.NEW,
    source: 'Website',
    notes: 'Looking for weight loss programs.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    followUpLogs: []
  },
  {
    id: 'inq-002',
    name: 'Priya Patel',
    phone: '+91 9876543211',
    interest: 'Yoga Class',
    status: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.FOLLOW_UP,
    source: 'Walk-in',
    notes: 'Requested a trial class for next week.',
    followUpDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    followUpLogs: [
      { date: new Date(Date.now() - 86400000 * 2).toISOString(), note: 'Called, asked to call back later.' }
    ]
  },
  {
    id: 'inq-003',
    name: 'Amit Kumar',
    phone: '+91 9876543212',
    email: 'amit.k@example.com',
    interest: 'Yearly Membership',
    status: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.CONVERTED,
    source: 'Referral',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    followUpLogs: []
  },
  {
    id: 'inq-004',
    name: 'Sneha Gupta',
    phone: '+91 9876543213',
    interest: 'Weight Training',
    status: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.LOST,
    source: 'Instagram',
    notes: 'Joined another gym closer to home.',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    followUpLogs: [
      { date: new Date(Date.now() - 86400000 * 14).toISOString(), note: 'Sent pricing details.' }
    ]
  },
  {
    id: 'inq-005',
    name: 'Vikram Singh',
    phone: '+91 9876543214',
    email: 'vikram.s@example.com',
    interest: 'CrossFit',
    status: MANAGER_INQUIRIES_PIPELINE_STATUS_VALUES.NEW,
    source: 'Facebook',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    followUpLogs: []
  }
];

export const MOCK_INQUIRY_STATS: InquiryStats = {
  total: 45,
  new: 12,
  followUp: 18,
  converted: 10,
  lost: 5
};
