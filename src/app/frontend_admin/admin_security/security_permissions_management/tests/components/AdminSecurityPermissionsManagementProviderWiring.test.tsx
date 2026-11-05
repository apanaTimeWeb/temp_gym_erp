// Route composition must provide the exact context consumed by permission forms.
import { describe,expect,it } from 'vitest';
import { render } from '@testing-library/react';
import { useAdminNavigationLayoutConfirm } from '@/app/frontend_admin/admin_security/security_permissions_management/hooks/useAdminSecurityPermissionsManagementConfirm';
import { AdminNavigationLayoutConfirmProvider } from '@/app/frontend_admin/admin_security/security_permissions_management/components/feedback/AdminSecurityPermissionsManagementConfirmProvider';
function Probe(){ const {confirm}=useAdminNavigationLayoutConfirm(); return <output>{typeof confirm}</output>; }
describe('permissions confirmation context',()=>{ it('provides the exact feature confirmation hook',()=>{ const {getByText}=render(<AdminNavigationLayoutConfirmProvider><Probe/></AdminNavigationLayoutConfirmProvider>);expect(getByText('function')).toBeTruthy(); }); });
