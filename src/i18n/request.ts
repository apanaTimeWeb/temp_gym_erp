import { getRequestConfig } from 'next-intl/server';
import { appMessages } from '@/i18n/messages';

export default getRequestConfig(async () => {
  const locale = 'en';

  return {
    locale,
    messages: appMessages,
  };
});
