import { StatusCodes } from 'http-status-codes';

/**
 * @description Names HTTP statuses used by the trainer_library mock contract using the approved http-status-codes enum for readable mock response semantics.
 * @dependencies http-status-codes; transport-only mock constants.
 * @edge-case Keeps mock error semantics explicit and discoverable without raw magic numbers in handlers.
 */
export const TRAINER_LIBRARY_HTTP_STATUS_CODES = Object.freeze({
  NOT_FOUND: StatusCodes.NOT_FOUND,
  UNPROCESSABLE_ENTITY: StatusCodes.UNPROCESSABLE_ENTITY,
});
