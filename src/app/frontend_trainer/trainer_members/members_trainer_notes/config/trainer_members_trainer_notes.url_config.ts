export const TRAINER_NOTES_PAGE_LIST = '/frontend_trainer/trainer_members/members_trainer_notes' as const;
/** Verified from the supplied TrainerMembers URL registry; no new backend paths. */
export const TRAINER_NOTES_ROUTES = { DIRECTORY: '/frontend_trainer/trainer_members/members_directory_and_profile' } as const;
export const TRAINER_NOTES_QUERY = { MEMBER_ID: 'id' } as const;
export const TRAINER_NOTES_API = {
  member: (id: string) => `/trainer/trainer_members/${encodeURIComponent(id)}` as const,
  notes: (id: string) => `/trainer/trainer_members/${encodeURIComponent(id)}/notes` as const,
  MOCK_MEMBER: '/trainer/trainer_members/:id',
  MOCK_NOTES: '/trainer/trainer_members/:id/notes',
} as const;
