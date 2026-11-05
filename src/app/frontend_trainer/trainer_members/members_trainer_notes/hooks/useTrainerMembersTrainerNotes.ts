'use client';
// DATA FLOW: Member Notes UI → notes query/mutation hook → Notes API client → TanStack Query cache → member detail Notes tab.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TrainerMembersTrainerNotesApi } from '@/app/frontend_trainer/trainer_members/members_trainer_notes/api/TrainerMembersTrainerNotesApi';
const detailKey = (id: string) => ['trainer', 'members', 'trainer-notes', id] as const;
export function useTrainerMembersTrainerNotes(id: string) {
  const client = useQueryClient();
  const detail = useQuery({ queryKey: detailKey(id), queryFn: () => TrainerMembersTrainerNotesApi.detail(id), enabled: id.length > 0 });
  const addNote = useMutation({
    mutationFn: ({ text, key }: { text: string; key: string }) => TrainerMembersTrainerNotesApi.add(id, text, key),
    onSuccess: () => { void client.invalidateQueries({ queryKey: detailKey(id) }); void client.invalidateQueries({ queryKey: ['trainer_members', 'detail', id] }); },
  });
  return { detail, addNote };
}
