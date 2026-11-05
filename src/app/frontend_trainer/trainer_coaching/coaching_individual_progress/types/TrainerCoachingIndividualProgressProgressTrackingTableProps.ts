// RESPONSIBILITY: Owns the typed props contract for the paginated progress table.
import type { TrainerProgressTrackingProgressEntry, TrainerProgressTrackingProgressSortDirection, TrainerProgressTrackingProgressSortField } from '@/app/frontend_trainer/trainer_coaching/coaching_individual_progress/types/TrainerCoachingIndividualProgressProgressTrackingTypes';

export interface TrainerProgressTrackingTableProps {
  entries: TrainerProgressTrackingProgressEntry[];
  totalEntries: number;
  currentPage: number;
  itemsPerPage: number;
  sortBy: TrainerProgressTrackingProgressSortField;
  sortDirection: TrainerProgressTrackingProgressSortDirection;
  onPageChange: (page: number) => void;
  onSort: (field: TrainerProgressTrackingProgressSortField) => void;
  onEdit: (entry: TrainerProgressTrackingProgressEntry) => void;
  onDelete: (entryId: string) => void;
}
