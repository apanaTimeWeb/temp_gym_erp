// RESPONSIBILITY: Defines PublicLanding-owned domain, UI, API, error, and infrastructure contracts.
import type { ComponentType, ReactNode, RefObject, KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { LANDING_BMI_RESULT_CLASSES, LANDING_BMI_STATUS_VALUES } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactBmiConstants';
import type { LANDING_BOOKING_TYPE_VALUES } from '@/app/frontend_public/public_landing/landing_contact/constants/PublicLandingContactBookingConstants';

export type PublicLandingBmiStatus = typeof LANDING_BMI_STATUS_VALUES[keyof typeof LANDING_BMI_STATUS_VALUES];
export type PublicLandingBmiColorClass = typeof LANDING_BMI_RESULT_CLASSES[PublicLandingBmiStatus];

export interface PublicLandingBmiResult {
  value: string;
  status: PublicLandingBmiStatus;
  colorClass: PublicLandingBmiColorClass;
}

export type PublicLandingBookingType = typeof LANDING_BOOKING_TYPE_VALUES[number];

export interface PublicLandingBookingFormValues {
  name: string;
  email: string;
  phone: string;
  date: string;
  type: PublicLandingBookingType;
}

export interface PublicLandingContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface PublicLandingBookingApiPayload extends Omit<PublicLandingBookingFormValues, 'date'> {
  date: string;
}

export type PublicLandingContactApiPayload = PublicLandingContactFormValues;

export interface PublicLandingMockBookingRecord extends PublicLandingBookingApiPayload { id: string; }
export interface PublicLandingMockContactRecord extends PublicLandingContactApiPayload { id: string; }

export interface PublicLandingNavbarController {
  menuOpen: boolean;
  scrolled: boolean;
  menuPanelRef: RefObject<HTMLDivElement | null>;
  menuTriggerRef: RefObject<HTMLButtonElement | null>;
  handleCloseMenu: () => void;
  handleToggleMenu: () => void;
  handleMenuKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void;
}

export interface PublicLandingServiceConfig {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number; }>;
  iconToneClass: string;
}

export interface PublicLandingQueryProviderProps { children: ReactNode; }
export interface PublicLandingErrorBoundaryProps { error: Error & { digest?: string }; reset: () => void; }

export interface PublicLandingErrorReporterPayload {
  route: string;
  module: string;
  digest?: string;
  timestamp: string;
}
export type PublicLandingErrorReporter = (payload: PublicLandingErrorReporterPayload) => void;

export interface PublicLandingFieldValidationError { field: string; message: string; }
export interface PublicLandingPaginationMeta {
  total: number; page: number; limit: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean;
}

/** Client-normalized discriminated envelope. A client-generated requestId is NOT a backend trace ID. */
export type PublicLandingApiResponse<T> =
  | { success: true; message: string; data: T; requestId: string; meta?: PublicLandingPaginationMeta }
  | { success: false; message: string; data: null; requestId: string; errorCode: string;
      statusCode: number; meta?: PublicLandingPaginationMeta; error?: string;
      validationErrors?: PublicLandingFieldValidationError[] };

export interface PublicLandingApiRequestErrorOptions {
  errorCode?: string;
  validationErrors?: PublicLandingFieldValidationError[];
  statusCode?: number;
  isBackendMessage?: boolean;
}

export class PublicLandingApiRequestError extends Error {
  readonly errorCode?: string;
  readonly validationErrors?: PublicLandingFieldValidationError[];
  readonly statusCode?: number;
  readonly isBackendMessage: boolean;

  constructor(message: string, options?: PublicLandingApiRequestErrorOptions) {
    super(message);
    this.name = 'PublicLandingApiRequestError';
    this.errorCode = options?.errorCode;
    this.validationErrors = options?.validationErrors;
    this.statusCode = options?.statusCode;
    this.isBackendMessage = options?.isBackendMessage ?? false;
  }
}
