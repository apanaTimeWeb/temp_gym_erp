import { describe, expect, it } from 'vitest';

import { isManagerLibraryDietPlansView, resolveManagerLibraryDietPlansView } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/utils/ManagerLibraryDietPlansResolveView';
import { MANAGER_LIBRARY_DIET_PLANS_DEFAULT_VIEW, MANAGER_LIBRARY_DIET_PLANS_VIEW_IDS } from '@/app/frontend_manager/manager_workout_diet_library/library_diet_plans/constants/manager_library_diet_plans_view.constants';

describe('Manager Library view URL contract', () => {
  it('declares the complete canonical view set', () => {
    expect(MANAGER_LIBRARY_DIET_PLANS_VIEW_IDS).toEqual(['diet', 'exercises']);
  });

  it.each(['diet', 'exercises'])('accepts canonical view %s', (view) => {
    expect(isManagerLibraryDietPlansView(view)).toBe(true);
    expect(resolveManagerLibraryDietPlansView(view)).toBe(view);
  });

  it.each([undefined, null, '', 'unknown', '__proto__', 'delete-all'])('falls back safely for invalid view %s', (view) => {
    expect(isManagerLibraryDietPlansView(view)).toBe(false);
    expect(resolveManagerLibraryDietPlansView(view)).toBe(MANAGER_LIBRARY_DIET_PLANS_DEFAULT_VIEW);
  });
});
