// RESPONSIBILITY: Collision-resistant identifiers for retry-equivalent HR actions.
export const getAdminHrStatusIntent = (id: string, nextActive: boolean): string =>
  JSON.stringify(['toggle-staff', id, nextActive]);
export const getAdminHrGeneratedJoinDateIntent = (editId: string | null, data: unknown): string =>
  JSON.stringify([editId, data]);
