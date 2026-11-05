import { describe, expect, it } from 'vitest';

import { ManagerInquiriesPipelineDisplayValue, ManagerInquiriesPipelineGenerateDefaultMessage as generateDefaultMessage, ManagerInquiriesPipelineFormatTime as formatInquiryTime } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import { INQUIRIES_STATUS_LABEL_KEYS, INQUIRIES_TABLE_HEADER_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_shared.constants';


describe('ManagerInquiriesPipelineSharedConstants', () => {
  it('renders missing display values with an en dash without hiding valid falsy values', () => {
    expect(ManagerInquiriesPipelineDisplayValue(null)).toBe('—');
    expect(ManagerInquiriesPipelineDisplayValue(undefined)).toBe('—');
    expect(ManagerInquiriesPipelineDisplayValue('')).toBe('—');
    expect(ManagerInquiriesPipelineDisplayValue(0)).toBe('0');
  });


  it('generates the documented default inquiry follow-up text', () => {
    expect(generateDefaultMessage({ greeting: 'Hi Asha!', details: 'Thank you for asking about weight loss.', signoff: 'Team GymSmart' })).toContain('Asha');
    expect(generateDefaultMessage({ greeting: 'Hi Asha!', details: 'Thank you for asking about weight loss.', signoff: 'Team GymSmart' })).toContain('weight loss');
  });

  it('keeps status labels and table structure stable', () => {
    expect(INQUIRIES_STATUS_LABEL_KEYS.NEW).toBe('TEXT_STATUS_NEW');
    expect(INQUIRIES_STATUS_LABEL_KEYS.CONVERTED).toBe('TEXT_STATUS_CONVERTED');
    expect(INQUIRIES_TABLE_HEADER_KEYS).toHaveLength(6);
    expect(formatInquiryTime('2026-01-15T10:30:00Z')).toMatch(/\d/);
  });
});
