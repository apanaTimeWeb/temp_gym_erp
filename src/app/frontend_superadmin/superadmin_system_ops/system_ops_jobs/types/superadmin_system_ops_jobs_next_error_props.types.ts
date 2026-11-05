// RESPONSIBILITY: Local Next.js route error contract for system_ops_jobs; no sibling imports.
export interface SuperadminSystemOpsJobsNextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
