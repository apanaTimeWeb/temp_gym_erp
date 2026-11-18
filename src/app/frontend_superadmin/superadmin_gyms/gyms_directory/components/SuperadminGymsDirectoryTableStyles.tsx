'use client';

import React from 'react';

export function SuperadminGymsDirectoryTableStyles() {
  return (
    <style>{`
      .gym-table-container {
        --table-bg-normal: var(--color-card, var(--bg-card, #ffffff));
        --table-bg-hover: color-mix(in srgb, var(--color-card, #ffffff), #eab308 12%);
        --table-header-bg: #27272a;
        --table-header-text: #fef08a;
        --table-header-border: #3f3f46;
      }
      :root.dark .gym-table-container,
      .dark .gym-table-container {
        --table-bg-normal: var(--color-card, var(--bg-card, #111111));
        --table-bg-hover: color-mix(in srgb, var(--color-card, #111111), #facc15 12%);
        --table-header-bg: color-mix(in srgb, #141414, #facc15 15%);
        --table-header-text: #fef08a;
        --table-header-border: rgba(250, 204, 21, 0.25);
      }
      .gym-row {
        --current-row-bg: var(--table-bg-normal);
        background-color: var(--current-row-bg);
      }
      .gym-row:hover {
        --current-row-bg: var(--table-bg-hover);
        background-color: var(--current-row-bg);
      }
      .sticky-left-cell {
        position: sticky;
        left: 0;
        background-color: var(--current-row-bg);
      }
      .sticky-right-cell {
        position: sticky;
        right: 0;
        background-color: var(--current-row-bg);
      }
      .sticky-header-cell {
        position: sticky;
        top: 0;
        background-color: var(--table-header-bg);
        color: var(--table-header-text);
        border-bottom-color: var(--table-header-border) !important;
      }
      .sticky-header-corner-left {
        position: sticky;
        left: 0;
        top: 0;
        background-color: var(--table-header-bg);
        color: var(--table-header-text);
        border-bottom-color: var(--table-header-border) !important;
      }
      .sticky-header-corner-right {
        position: sticky;
        right: 0;
        top: 0;
        background-color: var(--table-header-bg);
        color: var(--table-header-text);
        border-bottom-color: var(--table-header-border) !important;
      }
    `}</style>
  );
}

export default SuperadminGymsDirectoryTableStyles;
