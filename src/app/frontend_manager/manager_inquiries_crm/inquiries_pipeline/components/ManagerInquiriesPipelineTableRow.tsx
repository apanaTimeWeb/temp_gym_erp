// RESPONSIBILITY: Renders a single inquiry row and owns only row-level presentation and confirmations.
'use client';

import { UserRound, MessageCircle, Mail, Edit2, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { INQUIRIES_STATUS_LABEL_KEYS, INQUIRIES_TABLE_HEADER_KEYS } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/constants/manager_inquiries_pipeline_shared.constants';
import { ManagerInfrastructureTableRowActionMenu } from '@/app/frontend_manager/manager_infrastructure/components/ManagerInfrastructureTableContextMenu';
import { ManagerInquiriesPipelineDisplayValue, ManagerInquiriesPipelineFormatDate, ManagerInquiriesPipelineMaskSensitiveData } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/utils/ManagerInquiriesPipelineFormatters';
import type { Inquiry, ManagerInquiriesPipelineViewModel } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/types/manager_inquiries_pipeline.types';
import { useManagerInquiriesPipelineUiStore } from '@/app/frontend_manager/manager_inquiries_crm/inquiries_pipeline/state/useManagerInquiriesPipelineUiStore';

type Props = { inq: Inquiry; mapIndex: number; selected: boolean } & Pick<ManagerInquiriesPipelineViewModel, 'openEdit' | 'openMsg' | 'deleteInquiry' | 'updateStatus' | 'toggleSelectOne'>;
export default function ManagerInquiriesPipelineTableRow({ inq, mapIndex, selected, openEdit, openMsg, deleteInquiry, updateStatus, toggleSelectOne }: Props) {
  const t = useTranslations('MANAGER_INQUIRIES_PIPELINE');
  const { confirm } = useConfirm();
  const setConvertLead = useManagerInquiriesPipelineUiStore((state) => state.setConvertLead);
  const setSelectedLead = useManagerInquiriesPipelineUiStore((state) => state.setSelectedLead);
  const rowCardClass = 'cardStackRow max-md:mb-3 max-md:rounded-xl max-md:border max-md:border-border max-md:bg-card max-md:p-2 max-md:shadow-card md:table-row md:mb-0 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none';
  const cellBaseClass = 'cardStackCell max-md:flex max-md:items-start max-md:justify-between max-md:gap-4 max-md:border-b max-md:border-border max-md:px-3 max-md:py-2 max-md:text-right max-md:last:border-b-0 md:table-cell md:align-middle md:border-0 md:px-4 md:py-3.5 md:text-left';
  return (
    <tr
      tabIndex={0}
      onClick={() => setSelectedLead(inq)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setSelectedLead(inq);
        }
      }}
      onContextMenu={(event) => {
        const trigger = event.currentTarget.querySelector<HTMLButtonElement>('[data-row-action-menu-trigger="true"]');
        if (trigger) { event.preventDefault(); trigger.click(); }
      }}
                  data-testid={`manager_inquiries-inquiries-managerinquiriestable-row-${inq.id}`}
                  key={inq.id}
                  className={[rowCardClass, selected ? 'bg-primary-subtle' : 'hover:bg-primary-subtle', 'cursor-pointer motion-safe:transition-all motion-safe:duration-200 ease-in-out'].filter(Boolean).join(' ')}
                >
                  <td className={`px-5 py-3.5 w-12 ${cellBaseClass}`} data-label="" data-testid={`manager_inquiries-managerinquiriestable-cell-select-${mapIndex}`} onClick={(e) => e.stopPropagation()}>
                    <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-4 h-4 rounded border-border text-text-primary focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-input-toggleselectone-${mapIndex}`}
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleSelectOne(inq.id)}
                      
                     aria-label={t("TEXT_SELECT_INQUIRY", { value: inq.name })}/>
                  </td>
                  <td className={`px-5 py-3.5 ${cellBaseClass}`} data-label={t(INQUIRIES_TABLE_HEADER_KEYS[0])} data-mobile-primary="true"><span className="sr-only md:hidden">{t(INQUIRIES_TABLE_HEADER_KEYS[0])}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-warning text-on-warning" data-testid="manager_inquiries-managerinquiriestable-status-badge-1">
                        {ManagerInquiriesPipelineDisplayValue(inq.name).charAt(0)}
                      </div>
                      <p className="text-sm font-semibold text-text-primary">{ManagerInquiriesPipelineDisplayValue(inq.name)}</p>
                    </div>
                  </td>
                  <td className={`px-5 py-3.5 ${cellBaseClass}`} data-label={t(INQUIRIES_TABLE_HEADER_KEYS[1])}><span className="sr-only md:hidden">{t(INQUIRIES_TABLE_HEADER_KEYS[1])}</span>
                    <p className="text-sm text-text-primary">{ManagerInquiriesPipelineMaskSensitiveData(inq.phone, 'phone')}</p>
                    <p className="text-xs text-text-secondary">{ManagerInquiriesPipelineMaskSensitiveData(inq.email, 'email')}</p>
                  </td>
                  <td className={`px-5 py-3.5 text-sm text-text-secondary ${cellBaseClass}`} data-label={t(INQUIRIES_TABLE_HEADER_KEYS[2])}><span className="sr-only md:hidden">{t(INQUIRIES_TABLE_HEADER_KEYS[2])}</span>{ManagerInquiriesPipelineDisplayValue(inq.source)}</td>
                  <td className={`px-5 py-3.5 ${cellBaseClass}`} data-label={t(INQUIRIES_TABLE_HEADER_KEYS[3])} data-mobile-status="true" data-testid={`manager_inquiries-managerinquiriestable-cell-status-${mapIndex}`} onClick={(e) => e.stopPropagation()}>
                    <span className="sr-only md:hidden">{t(INQUIRIES_TABLE_HEADER_KEYS[3])}</span>
                    <div className="w-32">
                      <ManagerSearchableDropdown dataTestId="manager_inquiries-managerinquiriestable-managersearchabledropdown-1"
                        value={inq.status}
                        onChange={(val) => updateStatus(inq.id, String(val))}
                        options={Object.entries(INQUIRIES_STATUS_LABEL_KEYS).map(([val, labelKey]) => ({ label: t(labelKey), value: val }))}
                       data-testid="manager_inquiries-managerinquiriestable-searchable-dropdown-1"/>
                    </div>
                  </td>
                  <td className={`px-5 py-3.5 text-sm text-text-secondary ${cellBaseClass}`} data-label={t(INQUIRIES_TABLE_HEADER_KEYS[4])}><span className="sr-only md:hidden">{t(INQUIRIES_TABLE_HEADER_KEYS[4])}</span>
                    {ManagerInquiriesPipelineFormatDate(inq.createdAt)}
                  </td>
                  <td className={`px-5 py-3.5 ${cellBaseClass}`} data-label={t(INQUIRIES_TABLE_HEADER_KEYS[5])} data-mobile-actions="true" onClick={(e) => e.stopPropagation()}><span className="sr-only md:hidden">{t(INQUIRIES_TABLE_HEADER_KEYS[5])}</span>
                    <ManagerInfrastructureTableRowActionMenu label={t(INQUIRIES_TABLE_HEADER_KEYS[5])} testId={`manager_inquiries-inquiries-managerinquiriestable-row-${inq.id}-actions-menu`}>
                    <div className="flex items-center gap-2">
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-success text-on-success motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-whatsapp-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); openMsg(inq, 'whatsapp'); }}
                        
                        title={t("COPY_WHATSAPP")}
                        aria-label={t("TEXT_WHATSAPP_INQUIRY", { value: inq.name })}
                       type="button">
                        <MessageCircle size={18} strokeWidth={2}/>
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-info text-on-info motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-email-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); openMsg(inq, 'email'); }}
                        
                        title={t("COPY_EMAIL_1")}
                        aria-label={t("TEXT_EMAIL_INQUIRY", { value: inq.name })}
                       type="button">
                        <Mail size={18} strokeWidth={2}/>
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-primary-subtle text-primary motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-convert-to-member-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); setConvertLead(inq); }}
                        
                        title={t("COPY_CONVERT_MEMBER_2")}
                        aria-label={t("TEXT_CONVERT_INQUIRY", { value: inq.name })}
                       type="button">
                        <UserRound size={18} strokeWidth={2} aria-hidden="true" />
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-input text-text-secondary hover:bg-primary-subtle motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-edit-${mapIndex}`}
                        onClick={(e) => { e.stopPropagation(); openEdit(inq); }}
                        
                        title={t("COPY_EDIT")}
                        aria-label={t("TEXT_EDIT_INQUIRY", { value: inq.name })}
                       type="button">
                        <Edit2 size={18} strokeWidth={2}/>
                      </button>
                      <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1.5 rounded-lg bg-danger text-on-danger motion-safe:transition-all motion-safe:duration-200 ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_inquiries-inquiries-managerinquiriestable-button-delete-inquiry-${mapIndex}`}
                        onClick={async (e) => {
                          e.stopPropagation();
                          const ok = await confirm({
                            title: t("COPY_DELETE_INQUIRY"),
                            message: t("TEXT_DELETE_INQUIRY_CONFIRM_MESSAGE", { value: inq.name }),
                            type: 'danger',
                            confirmText: t("COPY_DELETE_1")
                          });
                          if (ok) {
                            deleteInquiry(inq.id);
                          }
                        }}
                        
                        title={t("COPY_DELETE_2")}
                        aria-label={t("TEXT_DELETE_INQUIRY", { value: inq.name })}
                       type="button">
                        <Trash2 size={18} strokeWidth={2}/>
                      </button>
                    </div>
                    </ManagerInfrastructureTableRowActionMenu>
                  </td>
                </tr>
  );
}
