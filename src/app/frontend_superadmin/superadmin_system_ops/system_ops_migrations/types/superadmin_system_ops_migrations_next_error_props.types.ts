// RESPONSIBILITY: Local Next.js route error contract for system_ops_migrations; no sibling imports.
export interface SuperadminSystemOpsMigrationsNextErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
