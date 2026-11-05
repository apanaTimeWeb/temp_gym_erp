import { describe, expect, it } from 'vitest';

import { ManagerInquiriesPipelineCalculatePriceForCycle as getPriceForCycleSnapshot } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineCalculatePriceForCycle';
import { INQUIRIES_CYCLE_LABELS, INQUIRIES_GENDER_OPTIONS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_convert.constants';


describe('ManagerInquiriesPipelineConvertConstants', () => {
  const plan = { price1Month: 1000, price3Month: 2500, price6Month: 4500, price12Month: 8000, priceCustom: 120 };

  it('calculates the selected cycle from the owning plan snapshot', () => {
    expect(getPriceForCycleSnapshot(plan, 'ONE_MONTH')).toBe(1000);
    expect(getPriceForCycleSnapshot(plan, 'CUSTOM', 5)).toBe(600);
    expect(getPriceForCycleSnapshot(undefined, 'ONE_MONTH')).toBe(0);
  });

  it('keeps conversion labels and gender options stable', () => {
    expect(INQUIRIES_CYCLE_LABELS.SIX_MONTHS).toBe('6 Months');
    expect(INQUIRIES_GENDER_OPTIONS.map((item) => item.value)).toEqual(['MALE', 'FEMALE', 'OTHER']);
  });
});
