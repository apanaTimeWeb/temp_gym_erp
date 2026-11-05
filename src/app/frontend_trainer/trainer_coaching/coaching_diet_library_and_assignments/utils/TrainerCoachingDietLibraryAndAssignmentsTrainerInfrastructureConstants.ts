// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Defines Trainer zero-business infrastructure defaults.
// DATA FLOW: Shared infrastructure consumers -> module-owned infrastructure constants.

export const TRAINER_INFRASTRUCTURE_ITEMS_PER_PAGE = 10;

export const TRAINER_INFRASTRUCTURE_STAT_CARD_CHANGE_TYPES = ['up', 'down', 'neutral'] as const;
