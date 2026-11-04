/**
 * Centralized application logger.
 * Direct console.log in committed production feature code is forbidden by Rule 44.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

const isProduction = process.env.NODE_ENV === "production";

function formatMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
}

export const logger = {
  info: (message: string, ...args: unknown[]): void => {
    if (!isProduction) {
      console.info(formatMessage("info", message), ...args);
    }
  },
  warn: (message: string, ...args: unknown[]): void => {
    console.warn(formatMessage("warn", message), ...args);
  },
  error: (message: string, ...args: unknown[]): void => {
    console.error(formatMessage("error", message), ...args);
  },
  debug: (message: string, ...args: unknown[]): void => {
    if (!isProduction) {
      console.debug(formatMessage("debug", message), ...args);
    }
  },
};

