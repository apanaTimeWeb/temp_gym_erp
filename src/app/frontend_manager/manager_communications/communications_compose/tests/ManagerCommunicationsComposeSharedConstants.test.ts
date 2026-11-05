import { describe, expect, it } from 'vitest';

import { CANCELLATIONS_REASON_OPTIONS, COMM_CHANNEL_OPTIONS, COMM_ITEMS_PER_PAGE, COMM_MESSAGE_TEMPLATES, COMM_SEGMENT_OPTIONS } from '@/app/frontend_manager/manager_communications/communications_compose/constants/manager_communications_campaigns_shared.constants';


describe('ManagerCommunicationsCampaignsSharedConstants', () => {
  it('keeps channel and segment choices aligned with the communication contract', () => {
    expect(COMM_CHANNEL_OPTIONS.map((item) => item.value)).toEqual(['whatsapp', 'email']);
    expect(COMM_SEGMENT_OPTIONS).toHaveLength(6);
    expect(COMM_ITEMS_PER_PAGE).toBe(10);
  });

  it('provides a template for every segment option', () => {
    for (const option of COMM_SEGMENT_OPTIONS) {
      expect(COMM_MESSAGE_TEMPLATES[option.value].subject).toBeTruthy();
      expect(COMM_MESSAGE_TEMPLATES[option.value].message).toContain('{name}');
    }
  });

  it('keeps the cancellation reason filter complete', () => {
    expect(CANCELLATIONS_REASON_OPTIONS[0]?.value).toBe('all');
    expect(CANCELLATIONS_REASON_OPTIONS).toHaveLength(7);
  });
});
