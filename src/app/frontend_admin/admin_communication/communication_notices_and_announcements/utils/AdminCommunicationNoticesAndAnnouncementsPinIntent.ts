// RESPONSIBILITY: Keeps retry identities for pin/unpin actions distinct without assuming a backend toggle payload.
// DATA FLOW: loaded announcement id/isPinned → intent tuple → feature-local idempotency map.
export const adminAnnouncementPinIntent = (id: string, currentlyPinned: boolean): string =>
  JSON.stringify(['toggle-announcement-pin', id, currentlyPinned ? 'unpin' : 'pin']);
