// DATA FLOW: Modal inputs/default message → useManagerInquiriesPipelineBulkMessageDraft → owning bulk-message modal UI.
'use client';

import { useEffect, useState } from 'react';

/**
 * @description Owns inquiry bulk-message draft lifecycle inside the inquiries feature boundary.
 * @dependencies React state/lifecycle only; no sibling business module dependencies.
 * @edge-case Reinitializes recipient tracking and the message draft whenever the modal opens with a new default message.
 */
export function useManagerInquiriesPipelineBulkMessageDraft(open: boolean, defaultMessage: string) {
  const [message, setMessage] = useState(defaultMessage);
  const [subject, setSubject] = useState('Message from GymSmart');
  const [openedRecipientKeys, setOpenedRecipientKeys] = useState<Set<string>>(new Set());
  const initialSubject = 'Message from GymSmart';

  // EFFECT: Reinitialize transient recipient state only when the modal opens or its default message changes.
  useEffect(() => {
    if (!open) return;
    setOpenedRecipientKeys(new Set());
    setMessage(defaultMessage);
  }, [defaultMessage, open]);

  return { message, setMessage, subject, setSubject, openedRecipientKeys, setOpenedRecipientKeys, initialSubject };
}
