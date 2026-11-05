// RESPONSIBILITY: Builds the standard member communication templates from member data.
export const ManagerMembersDirectoryMessageTemplates = {
  EXPIRED: (name: string) => `Hi ${name}! 🔔\n\nYour membership has expired. Renew today to continue your fitness journey!\n\n— Team GymSmart`,
  PENDING: (name: string, formattedAmount: string) => `Hi ${name} 🙏\n\nFriendly reminder: You have a pending amount of ${formattedAmount}. Please clear your dues at the earliest.\n\n— Team GymSmart`,
  DEFAULT: (name: string) => `Hi ${name}! 👋\n\nThis is a message from GymSmart. We hope you're enjoying your fitness journey!\n\n— Team GymSmart`,
};
