'use client';

import React from 'react';
import { Database, Loader2, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export interface StepState {
  key: string;
  label: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  message?: string;
}

export const INITIAL_PROVISION_STEPS: StepState[] = [
  { key: 'db', label: 'Creating database', status: 'pending' },
  { key: 'migrations', label: 'Running migrations', status: 'pending' },
  { key: 'seeds', label: 'Seeding data', status: 'pending' },
  { key: 'admin', label: 'Creating admin user', status: 'pending' },
  { key: 'email', label: 'Sending welcome email', status: 'pending' },
];

export interface SuperadminGymsDirectoryAddGymConsoleProps {
  steps: StepState[];
  consoleLogs: string[];
  provisioningFailed: boolean;
  provisioningDone: boolean;
  onRetry: (e: React.FormEvent) => void;
  onGoToList: () => void;
}

export function SuperadminGymsDirectoryAddGymConsole({
  steps,
  consoleLogs,
  provisioningFailed,
  provisioningDone,
  onRetry,
  onGoToList,
}: SuperadminGymsDirectoryAddGymConsoleProps) {
  return (
    <div className="bg-page border border-border rounded-xl p-6 shadow-card space-y-4 sticky top-6">
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <Database size={20} className="text-primary" />
        <h2 className="text-base font-bold text-primary">Provisioning Console</h2>
      </div>

      {/* Stepper Progress */}
      <div className="space-y-3 py-2">
        {steps.map((s, index) => (
          <div key={s.key} className="flex items-center gap-3 text-xs">
            <div className="shrink-0">
              {s.status === 'running' && (
                <Loader2 size={18} className="animate-spin text-primary" />
              )}
              {s.status === 'success' && (
                <CheckCircle2 size={18} className="text-success" />
              )}
              {s.status === 'failed' && (
                <XCircle size={18} className="text-danger" />
              )}
              {s.status === 'pending' && (
                <div className="w-4 h-4 rounded-full border border-disabled flex items-center justify-center text-[10px] text-disabled">
                  {index + 1}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  s.status === 'running'
                    ? 'text-primary'
                    : s.status === 'success'
                      ? 'text-success'
                      : s.status === 'failed'
                        ? 'text-danger'
                        : 'text-disabled'
                }`}
              >
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Logs Output */}
      <div className="bg-card rounded-lg p-3 font-mono text-[11px] text-secondary h-48 overflow-y-auto space-y-1 border border-border">
        {consoleLogs.length === 0 ? (
          <p className="text-disabled italic">Awaiting submit...</p>
        ) : (
          consoleLogs.map((log, i) => (
            <p key={i} className="leading-tight">
              <span className="text-disabled me-1.5">&gt;</span>
              {log}
            </p>
          ))
        )}
      </div>

      {/* Failure: Retry button */}
      {provisioningFailed && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="w-full min-h-11 rounded-lg bg-danger text-on-danger font-bold text-xs inline-flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
          >
            <RefreshCw size={14} /> Retry Provisioning
          </button>
        </div>
      )}

      {/* Success: Go to Gyms button */}
      {provisioningDone && (
        <div className="p-3 bg-success-bg border border-border rounded-lg space-y-3">
          <p className="text-xs text-success-text font-bold flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Gym provisioned and ready!
          </p>
          <button
            type="button"
            onClick={onGoToList}
            className="w-full min-h-11 rounded-lg bg-primary text-on-primary font-bold text-xs inline-flex items-center justify-center gap-2 hover:bg-primary-hover cursor-pointer"
          >
            Go to Gyms Directory
          </button>
        </div>
      )}
    </div>
  );
}

export default SuperadminGymsDirectoryAddGymConsole;
