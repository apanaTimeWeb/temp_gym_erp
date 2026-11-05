import { StatusCodes } from 'http-status-codes';

/**
 * @description Names HTTP statuses used by the trainer_sessions mock contract using the approved http-status-codes enum for readable mock response semantics.
 * @dependencies http-status-codes; transport-only mock constants.
 * @edge-case Keeps mock error semantics explicit and discoverable without raw magic numbers in handlers.
 */
export const TRAINER_SESSIONS_HTTP_STATUS_CODES = Object.freeze({
  UNPROCESSABLE_ENTITY: StatusCodes.UNPROCESSABLE_ENTITY,
  NOT_FOUND: StatusCodes.NOT_FOUND,
});
