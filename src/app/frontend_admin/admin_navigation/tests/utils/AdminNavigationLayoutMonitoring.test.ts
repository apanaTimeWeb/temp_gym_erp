// RESPONSIBILITY: Defines regression tests for AdminNavigationLayoutMonitoring.test; it verifies the owning module's behavior and does not implement production runtime behavior.
// DATA FLOW: test setup and controlled fixtures → owning module under test → assertions and cleanup (admin_navigation/tests/utils/AdminNavigationLayoutMonitoring.test.ts)

import { afterEach, describe, expect, it, vi } from 'vitest';
import { configureAdminMonitoringAdapter, logErrorToMonitoring } from '@/app/frontend_admin/admin_navigation/utils/AdminNavigationLayoutMonitoring';

describe('logErrorToMonitoring', () => {
  afterEach(() => configureAdminMonitoringAdapter(null));

  it('sends only allow-listed diagnostic metadata to the host adapter', () => {
    const captureException = vi.fn();
    configureAdminMonitoringAdapter({ captureException });
    const error = Object.assign(new Error('sensitive message must not be forwarded'), { digest: 'digest-1', stack: 'sensitive stack' });

    logErrorToMonitoring(error, { module: 'admin_members', route: '/admin/members' });

    expect(captureException).toHaveBeenCalledOnce();
    const payload = captureException.mock.calls[0][0];
    expect(payload).toEqual(expect.objectContaining({ errorName: 'Error', digest: 'digest-1', module: 'admin_members', route: '/admin/members' }));
    expect(JSON.stringify(payload)).not.toContain('sensitive');
    expect(JSON.stringify(payload)).not.toContain('stack');
  });

  it('does not send a request when the host monitoring adapter is not supplied', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    logErrorToMonitoring(new Error('safe'), { module: 'admin_members' });
    expect(fetchMock).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
