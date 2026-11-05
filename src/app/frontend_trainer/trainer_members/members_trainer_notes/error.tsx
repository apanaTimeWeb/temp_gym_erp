'use client';
export default function TrainerNotesError({reset}: {error: Error; reset: () => void}) { return <div role="alert" className="rounded-xl border border-border bg-danger-bg p-5 text-danger"><button type="button" onClick={reset} className="min-h-11 rounded-lg bg-primary px-4 text-on-primary">Retry</button></div>; }
