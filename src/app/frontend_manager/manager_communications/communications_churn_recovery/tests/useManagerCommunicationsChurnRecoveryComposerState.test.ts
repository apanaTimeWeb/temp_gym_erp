import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CANCELLATIONS_WIN_BACK_TEMPLATES } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/constants/manager_communications_campaigns_shared.constants';
import { useManagerCommunicationsCampaignsChurnRecoveryComposerState } from '@/app/frontend_manager/manager_communications/communications_churn_recovery/hooks/useManagerCommunicationsChurnRecoveryComposerState';

describe('useManagerCommunicationsChurnRecoveryComposerState', () => {
  it('hydrates the draft from the selected tier', () => {
    const tier = Object.keys(CANCELLATIONS_WIN_BACK_TEMPLATES)[0] as keyof typeof CANCELLATIONS_WIN_BACK_TEMPLATES;
    const { result } = renderHook(() => useManagerCommunicationsCampaignsChurnRecoveryComposerState(null, tier));
    expect(result.current.message).toBe(CANCELLATIONS_WIN_BACK_TEMPLATES[tier].message);
  });
});
