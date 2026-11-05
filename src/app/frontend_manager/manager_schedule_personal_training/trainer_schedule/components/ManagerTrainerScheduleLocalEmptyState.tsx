// RESPONSIBILITY: Presents the trainer-schedule empty-state layout using caller-provided copy and optional action content; it does not load schedule data or decide availability.
import type { ReactNode } from 'react';

type ManagerLocalEmptyStateProps = { dataTestId?: string; icon?: ReactNode; title: string; subtitle?: string };
export default function ManagerTrainerScheduleLocalEmptyState({ dataTestId, icon, title, subtitle }: ManagerLocalEmptyStateProps) {
  return <div data-testid={dataTestId} className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-6 py-8 text-center"><div className="mb-1 text-muted-foreground" aria-hidden="true">{icon}</div><h3 className="text-sm font-semibold text-foreground">{title}</h3>{subtitle ? <p className="max-w-md text-sm text-muted-foreground">{subtitle}</p> : null}</div>;
}
