'use client';


import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { SUPERADMIN_GYMS_MANAGEMENT_EXTERNAL } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/constants/superadmin_gyms_directory.constants';
import { useSuperadminGymsDirectoryUnsavedChangesGuard } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/hooks/useSuperadminGymsDirectoryUnsavedChangesGuard';
import { gymWhatsappSchema } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas';
import { useSuperadminGymsDirectoryStore } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/state/useSuperadminGymsDirectoryStore';
import { formatSuperadminGymWhatsappReceiptDate } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryGymWhatsappReceiptUtils';
import * as WhatsAppFormatter from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/utils/SuperadminGymsDirectoryWhatsappReceiptFormatter';

import type { GymWhatsappFormValues } from '@/app/frontend_superadmin/superadmin_gyms/gyms_directory/schemas/superadmin_gyms_directory.schemas';

/**
 * Opens a prefilled WhatsApp chat for the selected gym owner. The frontend must not
 * call the email API as a substitute for a missing WhatsApp send endpoint. The user
 * must review and send the message inside WhatsApp; opening the link is not delivery.
 */
export function useSuperadminGymsDirectoryGymWhatsappModal() {
  const t = useTranslations('superadmin_gyms');
  const { confirm } = useConfirm();
  const isWhatsappModalOpen = useSuperadminGymsDirectoryStore((state) => state.isWhatsappModalOpen);
  const closeWhatsappModal = useSuperadminGymsDirectoryStore((state) => state.closeWhatsappModal);
  const selectedGym = useSuperadminGymsDirectoryStore((state) => state.selectedGym);
  const locale = useLocale();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm<GymWhatsappFormValues>({
    resolver: zodResolver(gymWhatsappSchema),
  });

  useEffect(() => {
    if (isWhatsappModalOpen) reset({ subject: '', message: '' });
  }, [isWhatsappModalOpen, reset]);

  useSuperadminGymsDirectoryUnsavedChangesGuard(
    isDirty && isWhatsappModalOpen && !isSubmitting,
    t('ui.unsent_whatsapp_discard_repair'),
  );

  const closeWhatsappModalSafely = async () => {
    if (isSubmitting) return;
    if (isDirty) {
      const approved = await confirm({
        title: t('ui.unsaved_changes_title'),
        message: t('ui.unsent_whatsapp_discard_repair'),
        type: 'warning',
        confirmText: t('ui.discard_changes'),
        cancelText: t('ui.stay_on_page'),
      });
      if (!approved) return;
    }
    reset();
    closeWhatsappModal();
  };

  const onSubmit = (data: GymWhatsappFormValues) => {
    if (!selectedGym?.phone) {
      toast.error(t('ui.whatsapp_phone_unavailable_repair'), { id: 'superadmin-gym-whatsapp-phone-error' });
      return;
    }

    const rawDigits = String(selectedGym.phone).replace(/\D/g, '');
    const cleanDigits = rawDigits.startsWith('0') && rawDigits.length === 11 ? rawDigits.slice(1) : rawDigits;
    const cleanPhone = cleanDigits.startsWith('91') && cleanDigits.length === 12
      ? cleanDigits
      : cleanDigits.length === 10
      ? `91${cleanDigits}`
      : cleanDigits;
    if (!cleanPhone) {
      toast.error(t('ui.whatsapp_phone_unavailable_repair'), { id: 'superadmin-gym-whatsapp-phone-error' });
      return;
    }

    const waText = WhatsAppFormatter.formatReceipt({
      title: 'Smart Gym 360',
      subtitle: data.subject,
      date: formatSuperadminGymWhatsappReceiptDate(new Date(), locale),
      customerInfo: {
        Owner: String(selectedGym.ownerName || 'Gym Owner'),
        Gym: String(selectedGym.name || 'Gym'),
      },
      sections: [{ title: 'Message', items: { Content: String(data.message) } }],
      footer: 'Powered by Smart Gym 360',
    });
    const popup = window.open(SUPERADMIN_GYMS_MANAGEMENT_EXTERNAL.WHATSAPP_CLICK_TO_CHAT(cleanPhone, waText), '_blank', 'noopener,noreferrer');
    if (!popup) {
      toast.error(t('ui.whatsapp_popup_blocked_repair'), { id: 'superadmin-gym-whatsapp-popup-error' });
      return;
    }
    try {
      popup.opener = null;
    } catch {
      // Ignored for strict cross-origin or sandboxed test environments
    }
    toast.info(t('ui.whatsapp_opened_for_review_repair'), { id: 'superadmin-gym-whatsapp-opened' });
    closeWhatsappModal();
  };

  return {
    isWhatsappModalOpen,
    closeWhatsappModal: closeWhatsappModalSafely,
    selectedGym,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isDirty,
  };
}
