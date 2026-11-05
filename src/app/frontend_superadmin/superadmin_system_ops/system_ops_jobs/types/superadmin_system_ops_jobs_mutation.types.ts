import type { Dispatch, SetStateAction } from 'react';

export interface SuperadminSystemOpsJobsMutationOptions {
  setSelectedJobIds: Dispatch<SetStateAction<Set<string>>>;
  selectedJobIds: Set<string>;
}
