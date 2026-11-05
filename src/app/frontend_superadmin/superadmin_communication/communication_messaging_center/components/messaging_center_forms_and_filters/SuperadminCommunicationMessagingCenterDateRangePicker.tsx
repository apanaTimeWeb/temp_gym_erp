// RESPONSIBILITY: Renders/orchestrates SuperadminCommunicationMessagingDateRangePicker within its owning Superadmin feature module; no direct backend implementation.
'use client';
// RESPONSIBILITY: Renders the SuperadminCommunicationMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility.
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

import { SUPERADMIN_COMMUNICATION_MESSAGING_DATE_RANGE_OPTIONS } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/constants/superadmin_communication_messaging_center_date_range.constants';
import { useSuperadminCommunicationMessagingCenterDateRangePicker } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/hooks/useSuperadminCommunicationMessagingCenterDateRangePicker';

import type { SuperadminCommunicationMessagingDateRangePickerProps } from '@/app/frontend_superadmin/superadmin_communication/communication_messaging_center/types/superadmin_communication_messaging_center_date_range_picker.types';



/**
 * @description Renders the SuperadminCommunicationMessagingDateRangePicker control; date calculation and state are isolated in the adjacent hook/utility.
 * @dependencies Consumes feature-local state/data through its declared props and hooks; it does not own unrelated business state.
 * @edge-case Must preserve the owning feature's loading, empty, error, disabled, keyboard, and repeated-action behavior where applicable.
 */
export default function SuperadminCommunicationMessagingCenterDateRangePicker({ onRangeChange }: SuperadminCommunicationMessagingDateRangePickerProps) {
  const t = useTranslations('superadmin_communication_messaging');
  const { range, customStart, customEnd, handleRangeChange, handleCustomStartChange, handleCustomEndChange } = useSuperadminCommunicationMessagingCenterDateRangePicker(onRangeChange);
  return (
    <div className="flex items-center gap-3 bg-page border border-border rounded-lg p-1.5 shadow-card">
      <div className="ps-2" aria-hidden="true"><Calendar size={18} strokeWidth={2} className="text-secondary" data-testid="superadmin_communication_messaging-superadmin-messaging-date-range-picker-date-range-picker-calendar"/></div>
      <div className="w-40 border-none">
        <SearchableDropdown data-testid="superadmin_communication_messaging-superadmin-messaging-date-range-picker-range-picker-SearchableDropdown-26" options={SUPERADMIN_COMMUNICATION_MESSAGING_DATE_RANGE_OPTIONS.map((option) => ({ value: option.value, label: t(option.labelKey) }))} value={range} onChange={handleRangeChange} className="border-none bg-transparent !p-0" />
      </div>
      {range === 'custom' ? (
        <div className="flex items-center gap-2 ps-2 border-s border-border">
          <label className="sr-only" htmlFor="superadmin-date-range-custom-start">{t('ui.start_date_36dbb46')}</label>
          <input  id="superadmin-date-range-custom-start" type="date" value={customStart} onChange={(event) => handleCustomStartChange(event.target.value)} className="min-h-11 bg-input text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_communication_messaging-superadmin-messaging-date-range-picker-range-picker-date-start"/>
          <span className="text-secondary" aria-hidden="true">{t('ui.text_336d5ebc')}</span>
          <label className="sr-only" htmlFor="superadmin-date-range-custom-end">{t('ui.end_date_d672350')}</label>
          <input  id="superadmin-date-range-custom-end" type="date" value={customEnd} onChange={(event) => handleCustomEndChange(event.target.value)} className="min-h-11 bg-input text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base ease-in-out"  data-testid="superadmin_communication_messaging-superadmin-messaging-date-range-picker-range-picker-date-end"/>
        </div>
      ) : null}
    </div>
  );
}


