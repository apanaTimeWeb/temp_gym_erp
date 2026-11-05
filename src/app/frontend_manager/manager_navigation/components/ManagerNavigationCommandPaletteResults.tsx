// RESPONSIBILITY: Renders filtered command palette results and their empty state.
'use client';

import { useTranslations } from 'next-intl';
import type { ManagerNavigationCommandItem } from '@/app/frontend_manager/manager_navigation/types/ManagerNavigationCommandPaletteTypes';
type Props = { commands: ManagerNavigationCommandItem[]; onChoose: (href: string) => void };
export default function ManagerNavigationCommandPaletteResults({ commands, onChoose }: Props) {
  const t = useTranslations('MANAGER_SHELL');
  return (
    <>
            <div className="max-h-96 overflow-y-auto p-2" data-testid="manager_navigation-command-palette-results">
              {commands.length > 0 ? commands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.href}
                    type="button"
                    data-testid={`manager_navigation-command-palette-page-${command.labelKey.toLowerCase()}`}
                    onClick={() => onChoose(command.href)}
                    className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-text-secondary hover:bg-surface-hover hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring motion-safe:transition-all"
                  >
                    <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{t(command.labelKey)}</span>
                    <span className="text-xs text-text-disabled">{command.href}</span>
                  </button>
                );
              }) : (
                <div className="px-4 py-8 text-center text-sm text-text-secondary" role="status" data-testid="manager_navigation-command-palette-empty-state">
                  {t('COMMAND_PALETTE_NO_RESULTS')}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-border bg-card px-4 py-2 text-xs text-text-secondary">
              <span>{commands.length} {t('COMMAND_PALETTE_RESULTS')}</span>
              <span>{t('COMMAND_PALETTE_TIP')}</span>
            </div>
    </>
  );
}
