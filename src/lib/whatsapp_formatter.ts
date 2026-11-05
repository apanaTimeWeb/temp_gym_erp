export interface WhatsAppReceiptSection {
  title?: string;
  items: Record<string, string>;
}

export interface WhatsAppReceiptPayload {
  title?: string;
  subtitle?: string;
  date?: string;
  customerInfo?: Record<string, string>;
  sections?: WhatsAppReceiptSection[];
  footer?: string;
}

export const WhatsAppFormatter = {
  formatReceipt(payload: WhatsAppReceiptPayload): string {
    const lines: string[] = [];
    if (payload.title) lines.push(`*${payload.title}*`);
    if (payload.subtitle) lines.push(payload.subtitle);
    if (payload.date) lines.push(`Date: ${payload.date}`);
    lines.push('');

    if (payload.customerInfo) {
      Object.entries(payload.customerInfo).forEach(([label, value]) => {
        lines.push(`${label}: ${value}`);
      });
      lines.push('');
    }

    if (payload.sections) {
      payload.sections.forEach((section) => {
        if (section.title) lines.push(`*${section.title}*`);
        Object.entries(section.items).forEach(([label, value]) => {
          lines.push(`${label}: ${value}`);
        });
        lines.push('');
      });
    }

    if (payload.footer) {
      lines.push(payload.footer);
    }

    return lines.join('\n');
  },
};
