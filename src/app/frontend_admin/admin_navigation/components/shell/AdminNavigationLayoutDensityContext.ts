"use client";
// RESPONSIBILITY: Owns the zero-business Admin density context instance.
// DATA FLOW: AdminNavigationLayoutDensityProvider → AdminNavigationLayoutDensityContext → shell density controls.

import { createContext } from 'react';
import type { AdminDensityContextValue } from '@/app/frontend_admin/admin_navigation/types/AdminNavigationLayoutTypes';

export const AdminNavigationLayoutDensityContext = createContext<AdminDensityContextValue | null>(null);
