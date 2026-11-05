// RESPONSIBILITY: Presents identity and status inputs for the member create/edit form.
'use client';

import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { GENDER_OPTIONS, MEMBER_EDIT_STATUS_OPTIONS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory_shared.constants';
import { MEMBER_ACTIVE_STATUS } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';
import type { MemberFormValues } from '@/app/frontend_manager/manager_members/members_directory/schemas/manager_members_directory_form.schemas';
import type { useManagerMembersDirectoryModalForm } from '@/app/frontend_manager/manager_members/members_directory/hooks/useManagerMembersDirectoryModalForm';
type FormState = ReturnType<typeof useManagerMembersDirectoryModalForm>;

type Props = { formState: FormState; editId: string | null };
export default function ManagerMembersDirectoryModalIdentityFields({ formState, editId }: Props) {
  const t = useTranslations('MANAGER_MEMBERS_DIRECTORY');
  const { useFormReturn, register, errors } = formState;
  return (
    <>
            {[
              { label: t("COPY_FULL_NAME"), key: 'name', type: 'text', placeholder: t("TEXT_PLACEHOLDER_FULL_NAME"), fullWidth: true },
              { label: t("COPY_EMAIL_1"), key: 'email', type: 'email', placeholder: t("TEXT_PLACEHOLDER_EMAIL") },
              { label: t("COPY_PHONE"), key: 'phone', type: 'tel', placeholder: t("TEXT_PLACEHOLDER_PHONE") },
              { label: t("COPY_AADHAAR_NO"), key: 'aadhaar', type: 'tel', placeholder: t("TEXT_PLACEHOLDER_AADHAAR") },
              { label: t("COPY_ADDRESS_1"), key: 'address', type: 'text', placeholder: t("TEXT_PLACEHOLDER_ADDRESS"), fullWidth: true },
            ].map((f, mapIndex) => (
              <div key={f.key} className={f.fullWidth ? 'sm:col-span-2' : ''}>
                <label htmlFor={`manager-managermembersmodal-field-${f.key}`} className="block text-sm font-medium text-text-secondary mb-0.5">{f.label}</label>
                <input id={`manager-managermembersmodal-field-${f.key}`} className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`w-full border rounded-xl px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 bg-input text-text-primary motion-safe:transition-all motion-safe:duration-200 ${
                    errors[f.key as keyof MemberFormValues] ? 'border-danger focus-visible:ring-danger' : 'border-border focus-visible:ring-focus-ring'
                  }`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_members-members-managermembersmodal-input-primary-${mapIndex}`}
                  type={f.type}
                  placeholder={f.placeholder}
                  maxLength={(() => { if (f.key === 'aadhaar') return 12; return (() => { if (f.type === 'tel') return 10; return undefined; })(); })()}
                  onKeyDown={f.type === 'tel' ? (e) => { 
                    if (['e', 'E', '-', '+', '.'].includes(e.key)) e.preventDefault(); 
                    if (e.key.length === 1 && !/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault(); 
                  } : undefined}
                  {...register(f.key as keyof MemberFormValues)}
                  
                />
                {errors[f.key as keyof MemberFormValues] && (
                  <p className="text-danger-text text-xs mt-1.5">{errors[f.key as keyof MemberFormValues]?.message as string}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_GENDER_2")}</label>
              <Controller
                name="gender"
                control={useFormReturn.control}
                render={({ field }) => (
                  <ManagerSearchableDropdown ariaLabel={t("COPY_GENDER_2")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-1"
                    value={field.value || ''}
                    onChange={field.onChange}
                    options={GENDER_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
                   data-testid="manager_members-managermembersmodal-searchable-dropdown-1"/>
                )}
              />
            </div>
            
            {editId && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-0.5">{t("COPY_MEMBER_STATUS")}</label>
                <Controller
                  name="status"
                  control={useFormReturn.control}
                  render={({ field }) => (
                    <ManagerSearchableDropdown ariaLabel={t("COPY_MEMBER_STATUS")} dataTestId="manager_members-managermembersmodal-managersearchabledropdown-2"
                      value={field.value || MEMBER_ACTIVE_STATUS}
                      onChange={field.onChange}
                      options={MEMBER_EDIT_STATUS_OPTIONS.map((option) => ({ ...option, label: t(option.labelKey) }))}
                     data-testid="manager_members-managermembersmodal-searchable-dropdown-2"/>
                  )}
                />
              </div>
            )}

    </>
  );
}
