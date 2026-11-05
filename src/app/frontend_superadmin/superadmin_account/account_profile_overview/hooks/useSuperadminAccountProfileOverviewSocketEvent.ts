'use client';
import { useEffect } from 'react';
import { socketService } from '@/lib/socket';

/** Subscribes the owning leaf to the centralized approved socket adapter. */
export function useSuperadminAccountProfileOverviewSocketEvent(event: string, handler: (payload: unknown) => void): void {
  useEffect(() => socketService.subscribe(event, handler), [event, handler]);
}
