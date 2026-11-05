// RESPONSIBILITY: Provides feature-local formatting or transformation helpers for audit_logs_explorer; it does not own network state or UI workflow.
// DATA FLOW: verified feature data → focused utility → formatted/normalized result → owning component or hook (admin_audit_logs/audit_logs_explorer/utils/AdminSecurityAuditLogsExplorerRedactMetadata.ts)

const SENSITIVE_KEY_PATTERN = /(password|passphrase|token|secret|authorization|cookie|email|phone|mobile|aadhaar|account|upi|address|ipaddress|useragent|financial|payment|salary|api[_ -]?key|private[_ -]?key|session[_ -]?id|otp|pin|cvv|cvc|ssn|card[_ -]?number|iban|routing[_ -]?number|birth[_ -]?date)/i;

/** Returns a recursively redacted metadata object for display; source API values are never mutated. @description Implements redactAdminAuditMetadata for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function redactAdminAuditMetadata(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactAdminAuditMetadata);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, child]) => [
      key,
      SENSITIVE_KEY_PATTERN.test(key) ? '[REDACTED]' : redactAdminAuditMetadata(child),
    ]));
  }
  if (typeof value === 'string') return redactAdminAuditText(value);
  return value;
}

/** Redacts secrets in unstructured audit text before it reaches any display/export surface. @description Implements redactAdminAuditText for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function redactAdminAuditText(value: string): string {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[REDACTED_EMAIL]')
    .replace(/(?<!\d)(?:\+?\d[\s().-]*){10,15}(?!\d)/g, '[REDACTED_PHONE]')
    .replace(/\b(Bearer|Basic)\s+[A-Za-z0-9._~+\/-]+=*/gi, '$1 [REDACTED]')
    .replace(/\beyJ[A-Za-z0-9_-]{6,}\.eyJ[A-Za-z0-9_-]{6,}\.[A-Za-z0-9_-]+\b/g, '[REDACTED_TOKEN]')
    .replace(/([\"'])(password|secret|token|apiKey|privateKey|otp|pin|cvv|cvc)\1(\s*:\s*)([\"'])[^\"']*\4/gi, '$1$2$1$3$4[REDACTED]$4')
    .replace(/\b(password|secret|token|api[_ -]?key)\s*[:=]\s*([^\s,;]+)/gi, '$1=[REDACTED]')
    .replace(/(?<!\d)(?:\d[ -]*?){13,19}(?!\d)/g, '[REDACTED_CARD]');
}

/** @description Implements redactAdminAuditIp for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function redactAdminAuditIp(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return '—';
  return '[REDACTED_IP]';
}

/** @description Implements redactAdminAuditUserAgent for the owning feature’s explicitly typed data. @param value - Input used by this utility as declared by the signature. @returns The typed result declared by the function signature. */
export function redactAdminAuditUserAgent(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return '—';
  return '[REDACTED_USER_AGENT]';
}
