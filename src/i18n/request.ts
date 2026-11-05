import { getRequestConfig } from 'next-intl/server';
import authLoginEn from '@/app/frontend_auth/auth_login/login_credentials_and_demo_access/locales/en.json';
import publicLandingEn from '@/app/frontend_public/public_landing/landing_experience/locales/public_landing_en.json';

const messages = {
  ...authLoginEn,
  ...publicLandingEn,
};

export default getRequestConfig(async () => {
  const locale = 'en';

  return {
    locale,
    messages,
  };
});

