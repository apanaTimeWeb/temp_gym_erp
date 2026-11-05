// RESPONSIBILITY: Defines feature-local TypeScript contracts for audit_logs_explorer; it does not invent fields beyond the verified source/schema contract.
// DATA FLOW: URL/API schema and module state → typed contracts → feature API/hooks/components/tests (admin_audit_logs/audit_logs_explorer/types/AdminSecurityAuditLogsExplorerDetailDrawerPropsTypes.ts)

// Type contract owned by this module; extracted from the component signature for AI isolation.
import type { AuditLog } from '@/app/frontend_admin/admin_security/security_audit_logs_explorer/types/AdminSecurityAuditLogsExplorerTypes';

export interface AdminAuditLogsDetailDrawerProps {
  onClose: () => void;
  log: AuditLog | null;
  isOpen: boolean;
}
