// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Owns the typed props contract for this component.

export interface TrainerInfrastructurePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}
