'use client';

import React from 'react';

export function SuperadminGymsDirectoryTableStyles() {
  return (
    <style>{`
      .gym-table-container {
        --table-bg-normal: var(--color-card, var(--bg-card, #ffffff));
        --table-bg-hover: rgba(255, 90, 31, 0.06);
        --table-header-bg: #f1f5f9;
        --table-header-text: #475569;
        --table-header-border: #e4e4e7;
      }
      :root.dark .gym-table-container,
      .dark .gym-table-container {
        --table-bg-normal: #0E1525;
        --table-bg-hover: rgba(255, 255, 255, 0.05);
        --table-header-bg: #152038;
        --table-header-text: #cbd5e1;
        --table-header-border: rgba(255, 255, 255, 0.1);
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
