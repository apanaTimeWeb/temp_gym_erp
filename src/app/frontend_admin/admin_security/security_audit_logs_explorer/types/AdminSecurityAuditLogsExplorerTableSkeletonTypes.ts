// RESPONSIBILITY: Defines the zero-business table skeleton sizing contract.
// DATA FLOW: Next.js route/lifecycle or owning module entry → feature-local components/hooks/contracts → host integration boundary (admin_navigation/types/AdminNavigationLayoutTableSkeletonTypes.ts)

export interface AdminTableSkeletonProps {
  rows?: number;
  columns?: number;
  cols?: number;
}
