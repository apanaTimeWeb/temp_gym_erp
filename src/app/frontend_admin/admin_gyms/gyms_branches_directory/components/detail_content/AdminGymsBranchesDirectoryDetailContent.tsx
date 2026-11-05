"use client";
// RESPONSIBILITY: Renders the selected branch's feature-owned detail content for the requested detail view.
// DATA FLOW: feature data/state and user input → AdminGymsBranchesDirectoryDetailContent → accessible UI/events routed to owning hooks (admin_branches/branches_directory/components/detail_content/AdminGymsBranchesDirectoryDetailContent.tsx)

import { useLocale, useTranslations } from 'next-intl';
import { BRANCH_PAYMENT_METHOD_STYLES } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryConstants';
import { AdminBranchesFormatCurrency } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/utils/AdminGymsBranchesDirectoryFormatCurrency';

import type { DetailView } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryUiTypes';
import type { Branch } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryTypes';
import AdminBranchesDetailEmpty from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/components/detail_empty/AdminGymsBranchesDirectoryDetailEmpty';
import { ADMIN_BRANCH_STAFF_STATUS, ADMIN_BRANCH_STAFF_STATUS_LABEL_KEYS, ADMIN_BRANCH_STUDENT_STATUS, ADMIN_BRANCH_STUDENT_STATUS_LABEL_KEYS } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/constants/AdminGymsBranchesDirectoryConstants';
import type { AdminBranchesDetailContentProps } from '@/app/frontend_admin/admin_gyms/gyms_branches_directory/types/AdminGymsBranchesDirectoryDetailContentPropsTypes';
/**
 * AdminGymsBranchesDirectoryDetailContent renders the admin branches detail content UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 * @description AdminGymsBranchesDirectoryDetailContent: Renders the selected branch's feature-owned detail content for the requested detail view.
 * @dependencies Consumes AdminBranchesConstants, AdminBranchesFormatCurrency, AdminBranchesUiTypes, AdminBranchesTypes, AdminBranchesDetailEmpty.
 * @edge-case Preserves loading, empty, error, permission, and recovery states and keeps API/mutation ownership outside the view layer.
 */
export default function AdminGymsBranchesDirectoryDetailContent({ branch, view }: AdminBranchesDetailContentProps) {
  const locale = useLocale();
  const t = useTranslations();
  if (view === 'revenue') {
    const items = branch.revenueItems ?? [];
    return items.length ? (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">{item.label}</p>
              <p className="text-xs text-secondary">{item.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs ${BRANCH_PAYMENT_METHOD_STYLES[item.method] ?? 'bg-input text-secondary'}`} data-testid="branches-directory-branches-directory-detail-content-status-badge">{item.method}</span>
              <span className="font-bold text-success">{AdminBranchesFormatCurrency(item.amount, undefined, locale)}</span>
            </div>
          </div>
        ))}
      </div>
    ) : <AdminBranchesDetailEmpty label={t('branches.admin_branches_detail_content.auto_71b0df7a57')} />;
  }

  if (view === 'expenses') {
    const items = branch.expenseItems ?? [];
    return items.length ? (
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">{item.label}</p>
              <p className="text-xs text-secondary">{item.category} · {item.date}</p>
            </div>
            <span className="font-bold text-danger">{AdminBranchesFormatCurrency(item.amount, undefined, locale)}</span>
          </div>
        ))}
      </div>
    ) : <AdminBranchesDetailEmpty label={t('branches.admin_branches_detail_content.auto_9fe77cb956')} />;
  }

  if (view === 'staff') {
    const items = branch.staffList ?? [];
    return items.length ? (
      <div className="space-y-3">
        {items.map((member) => (
          <div key={member.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
            <div>
              <p className="text-sm font-medium text-primary">{member.name}</p>
              <p className="text-xs text-secondary">{member.role} · {member.shift}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${member.status === ADMIN_BRANCH_STAFF_STATUS.ACTIVE ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`} data-testid={`admin_branches-admin_branches-detail-content-staff-status-${member.id}`}>{member.status === ADMIN_BRANCH_STAFF_STATUS.ACTIVE ? t(ADMIN_BRANCH_STAFF_STATUS_LABEL_KEYS.ACTIVE) : t(ADMIN_BRANCH_STAFF_STATUS_LABEL_KEYS.ON_LEAVE)}</span>
          </div>
        ))}
      </div>
    ) : <AdminBranchesDetailEmpty label={t('branches.admin_branches_detail_content.auto_5ebf3ca704')} />;
  }

  const students = branch.studentList ?? [];
  return students.length ? (
    <div className="space-y-3">
      {students.map((student) => (
        <div key={student.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-input p-3.5">
          <div>
            <p className="text-sm font-medium text-primary">{student.name}</p>
            <p className="text-xs text-secondary">{student.plan} {t('branches.AdminBranchesDetailContent.text_joined')} {student.joinDate}</p>
          </div>
          <span className={`rounded-full px-2 py-0.5 text-xs ${student.status === ADMIN_BRANCH_STUDENT_STATUS.ACTIVE ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'}`} data-testid={`admin_branches-admin_branches-detail-content-student-status-${student.id}`}>{student.status === ADMIN_BRANCH_STUDENT_STATUS.ACTIVE ? t(ADMIN_BRANCH_STUDENT_STATUS_LABEL_KEYS.ACTIVE) : t(ADMIN_BRANCH_STUDENT_STATUS_LABEL_KEYS.EXPIRED)}</span>
        </div>
      ))}
    </div>
  ) : <AdminBranchesDetailEmpty label={t('branches.admin_branches_detail_content.auto_bdbd7c154c')} />;
}
