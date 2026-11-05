// AUTONOMOUS COPY: Module-local, WET-isolated copy of original trainer-infrastructure primitive.
// RESPONSIBILITY: Sanitizes unknown request failures before they reach Trainer user-facing feedback surfaces.
const MAX_MESSAGE_LENGTH = 180;

/**
 * @description Sanitizes unknown request failures before they reach Trainer user-facing feedback surfaces.
 * @dependencies Uses only the module-owned dependencies declared by this artifact.
 * @edge-case Preserves documented loading, empty, error, accessibility, and recovery behavior without introducing undocumented business fallbacks.
 */
export function TrainerInfrastructureUserSafeError(error: unknown, fallbackMessage: string): string {
  if (!(error instanceof Error)) return fallbackMessage;
  const message = error.message.trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) return fallbackMessage;
  if (/https?:\/\//i.test(message) || /[{}<>\\]/.test(message)) return fallbackMessage;
  if (/\b(?:authorization|bearer|token|stack|trace|request id|digest|TypeError|ReferenceError|SyntaxError|RangeError|Unhandled|undefined|null|NaN|node_modules|webpack|next\.js|react-dom|prisma|sql|ECONN[A-Z]*|ETIMEDOUT|ENOTFOUND|ERR_[A-Z_]+)\b/i.test(message)) return fallbackMessage;
  if (/\b(?:GET|POST|PUT|PATCH|DELETE)\s+\/|\bat\s+[\w.$]+\s*\(/i.test(message)) return fallbackMessage;
  if (/\b(?:file|line|column)\s*:\s*\d+/i.test(message)) return fallbackMessage;
  return message;
}
