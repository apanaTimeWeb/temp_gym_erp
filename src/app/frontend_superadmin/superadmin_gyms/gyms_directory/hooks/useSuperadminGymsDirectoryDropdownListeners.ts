'use client';

import { useEffect } from 'react';

export function useSuperadminGymsDirectoryDropdownListeners({
  columnDropdownRef,
  kebabRef,
  setIsColumnDropdownOpen,
  setActiveKebabId,
}: {
  columnDropdownRef: React.RefObject<HTMLDivElement | null>;
  kebabRef: React.RefObject<HTMLDivElement | null>;
  setIsColumnDropdownOpen: (val: boolean) => void;
  setActiveKebabId: (val: string | null) => void;
}) {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (columnDropdownRef.current && !columnDropdownRef.current.contains(e.target as Node)) {
        setIsColumnDropdownOpen(false);
      }
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setActiveKebabId(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsColumnDropdownOpen(false);
        setActiveKebabId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [columnDropdownRef, kebabRef, setIsColumnDropdownOpen, setActiveKebabId]);
}

export default useSuperadminGymsDirectoryDropdownListeners;
