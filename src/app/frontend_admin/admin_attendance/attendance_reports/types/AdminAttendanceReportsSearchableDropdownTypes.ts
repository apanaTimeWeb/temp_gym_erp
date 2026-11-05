// RESPONSIBILITY: Defines the AdminNavigationLayoutSearchableDropdownTypes route, lifecycle boundary, or module support artifact for admin_navigation shell components; it does not expand the feature's approved scope.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/components/searchable_dropdown/types/AdminNavigationLayoutSearchableDropdownTypes.ts)

export interface AdminSearchableDropdownOption {
  value: string | number;
  label: string;
}

export interface AdminSearchableDropdownProps {
  options: AdminSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  testId?: string;
}
