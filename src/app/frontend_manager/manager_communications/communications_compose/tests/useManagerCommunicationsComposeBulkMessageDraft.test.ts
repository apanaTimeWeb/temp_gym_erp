import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useManagerCommunicationsCampaignsBulkMessageDraft } from '@/app/frontend_manager/manager_communications/communications_compose/hooks/useManagerCommunicationsComposeBulkMessageDraft';

describe('useManagerCommunicationsCampaignsBulkMessageDraft', () => {
  it('reinitializes message and recipients when opened', () => {
    const { result, rerender } = renderHook(({ open, message }) => useManagerCommunicationsCampaignsBulkMessageDraft(open, message), { initialProps: { open: false, message: 'Default' } });
    act(() => result.current.setMessage('Draft'));
    act(() => result.current.setOpenedRecipientKeys(new Set(['a'])));
    rerender({ open: true, message: 'Updated' });
    expect(result.current.message).toBe('Updated');
    expect(result.current.openedRecipientKeys.size).toBe(0);
  });
});
