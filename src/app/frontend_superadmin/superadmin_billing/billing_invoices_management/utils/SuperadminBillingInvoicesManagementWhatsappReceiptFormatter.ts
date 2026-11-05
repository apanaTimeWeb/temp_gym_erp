/**
 * Formats a feature-owned WhatsApp receipt/message using plain-text sections.
 * This formatter is intentionally module-local to preserve feature isolation.
 */
export type WhatsAppReceiptSection = {
  title?: string;
  items?: Record<string, string>;
};

export type WhatsAppReceiptInput = {
  title?: string;
  subtitle?: string;
  date?: string;
  dateLabel?: string;
  customerInformationTitle?: string;
  customerInfo?: Record<string, string>;
  sections?: WhatsAppReceiptSection[];
  footer?: string;
};

export const formatReceipt = (input: WhatsAppReceiptInput): string => {
  const lines: string[] = [];
  if (input.title) lines.push(`*${input.title}*`);
  if (input.subtitle) lines.push(input.subtitle);
  if (input.date) lines.push(`${input.dateLabel ?? 'Date'}: ${input.date}`);

  if (input.customerInfo && Object.keys(input.customerInfo).length) {
    lines.push('', `*${input.customerInformationTitle ?? 'Customer Information'}*`);
    for (const [label, value] of Object.entries(input.customerInfo)) lines.push(`${label}: ${value}`);
  }

  for (const section of input.sections ?? []) {
    lines.push('');
    if (section.title) lines.push(`*${section.title}*`);
    for (const [label, value] of Object.entries(section.items ?? {})) lines.push(`${label}: ${value}`);
  }

  if (input.footer) lines.push('', input.footer);
  return lines.join('\n');
};

export const WhatsAppFormatter = { formatReceipt };
