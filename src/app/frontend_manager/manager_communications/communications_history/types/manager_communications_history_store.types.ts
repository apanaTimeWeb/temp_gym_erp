import type { CommSegment, CommChannel } from '@/app/frontend_manager/manager_communications/communications_history/types/manager_communications_communications_history.types';

export interface ManagerCommunicationsHistoryStore {
  selectedSegment: CommSegment;
  setSelectedSegment: (selectedSegment: CommSegment) => void;
  selectedChannel: CommChannel;
  setSelectedChannel: (selectedChannel: CommChannel) => void;
  resetComposer: () => void;
}
