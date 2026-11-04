// RESPONSIBILITY: Stores Booking-only UI configuration and empty-form defaults for the PublicLanding module.
import { Calendar, CreditCard, Ticket } from 'lucide-react';
import type { ComponentType } from 'react';
import type { PublicLandingBookingType } from '@/app/frontend_public/public_landing/landing_booking/types/PublicLandingBookingTypes';

export const LANDING_BOOKING_TYPE_VALUES = ['trial', 'membership', 'class'] as const;
export const LANDING_PHONE_COUNTRY_CODE = '+91';
export const LANDING_BOOKING_OPTIONS = [
  { value: 'trial', icon: Ticket, labelKey: 'booking.options.trial' },
  { value: 'membership', icon: CreditCard, labelKey: 'booking.options.membership' },
  { value: 'class', icon: Calendar, labelKey: 'booking.options.class' },
] as const satisfies readonly { value: PublicLandingBookingType; labelKey: string; icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }> }[];
export const EMPTY_LANDING_BOOKING_FORM = { name: '', email: '', phone: '', date: '', type: 'trial' as PublicLandingBookingType };
