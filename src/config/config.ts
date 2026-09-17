export const CONFIG = {
  SITE_NAME: 'Sienna',
  CHECKOUT_URL: 'https://checkout.escalepay.com/4052897',
  PREVIEW_GROUP_URL: 'https://t.me/+YLPqOdmxvbgyYzY0',
  TELEGRAM_DOWNLOAD_URL: 'https://telegram.org/dl',
};

export type Language = 'pt' | 'en' | 'es';

export type Step = 'landing' | 'age' | 'quiz1' | 'quiz2' | 'quiz3' | 'telegram' | 'choice' | 'payment' | 'access';