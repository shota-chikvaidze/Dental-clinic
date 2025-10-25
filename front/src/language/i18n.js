import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EnTranslation from '../locales/en/translation.json';
import GeTranslation from '../locales/ge/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: EnTranslation },
      ge: { translation: GeTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
