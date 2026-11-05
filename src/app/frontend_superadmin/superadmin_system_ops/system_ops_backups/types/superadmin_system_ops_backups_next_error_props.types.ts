// RESPONSIBILITY: Local Next.js route error contract for system_ops_backups; no sibling imports.
export interface SuperadminSystemOpsBackupsNextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
