// RESPONSIBILITY: Supplies optional verified public contact values; never exposes guessed business details.
// FLOW: Validated environment-driven contact config -> contact section labels/actions.
import { Mail, MapPin, Phone } from 'lucide-react';
import { PublicLandingUrlConfig } from '@/app/frontend_public/public_landing/landing_contact/config/public_landing_contact.url_config';
import type { ComponentType } from 'react';

const email = PublicLandingUrlConfig.EXTERNAL.EMAIL;
const phone = PublicLandingUrlConfig.EXTERNAL.PHONE;
export const LANDING_CONTACT_DETAILS = [
  { icon: MapPin, titleKey: 'contact.details.location', text: PublicLandingUrlConfig.EXTERNAL.ADDRESS, href: null },
  { icon: Phone, titleKey: 'contact.details.phone', text: phone?.replace(/^tel:/, '') ?? null, href: phone },
  { icon: Mail, titleKey: 'contact.details.email', text: email?.replace(/^mailto:/, '') ?? null, href: email },
] as const satisfies readonly { icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>; titleKey: string; text: string | null; href: string | null }[];
