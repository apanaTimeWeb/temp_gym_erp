import { MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES } from '@/app/frontend_manager/manager_members/members_directory/constants/manager_members_directory.constants';

/**
 * @description Provides the ManagerMembersDirectorySharedConstants implementation for the members module.
 * @dependencies @/app/frontend_manager/manager_members/manager_members_schemas/ManagerMembersDirectoryFormSchema; ManagerMembersDirectoryValidationConstants is intentionally separated for schema-only numeric limits
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MEMBER_EXPORT_FORMATS = [
  { label: 'Export CSV', value: 'csv' as const },
  { label: 'Export PDF', value: 'pdf' as const },
];


/** Status options for the Edit Member modal dropdown (no 'All Status' entry). (Rule 3B) */
export const MEMBER_EDIT_STATUS_OPTIONS = [
  { label: 'Active', labelKey: 'COPY_ACTIVE', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.ACTIVE },
  { label: 'Pending', labelKey: 'COPY_PENDING', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.PENDING },
  { label: 'Expired', labelKey: 'COPY_EXPIRED', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.EXPIRED },
  { label: 'Frozen', labelKey: 'COPY_FROZEN', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.FROZEN },
  { label: 'Suspended', labelKey: 'COPY_SUSPENDED', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.SUSPENDED },
  { label: 'Banned', labelKey: 'COPY_BANNED', value: MANAGER_MEMBERS_DIRECTORY_STATUS_VALUES.BANNED },
];

export const GENDER_OPTIONS = [
  { label: 'Male', labelKey: 'COPY_MALE', value: 'MALE' },
  { label: 'Female', labelKey: 'COPY_FEMALE', value: 'FEMALE' },
  { label: 'Other', labelKey: 'COPY_OTHER', value: 'OTHER' }
];


export const MEMBERS_TABLE_HEADERS = [
  { key: 'id', labelKey: 'COPY_ID' },
  { key: 'name', labelKey: 'COPY_MEMBER_1', sortable: true },
  { key: 'gender', labelKey: 'COPY_GENDER_2' },
  { key: 'plan', labelKey: 'COPY_PLAN_2' },
  { key: 'status', labelKey: 'COPY_STATUS', sortable: true },
  { key: 'joinDate', labelKey: 'COPY_JOIN_DATE_3', sortable: true },
  { key: 'expiryDate', labelKey: 'COPY_EXPIRY_1', sortable: true },
  { key: 'paidAmount', labelKey: 'COPY_PAID', sortable: true },
  { key: 'pendingAmount', labelKey: 'COPY_PENDING' },
  { key: 'actions', labelKey: 'COPY_ACTIONS' },
] as const;
