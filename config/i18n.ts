import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocales } from 'expo-localization';
import en from '@/locales/en.json';
import tr from '@/locales/tr.json';

// console.log("Localization.locale.split('-')", getLocales())
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      tr: { translation: tr },
    },
    lng: "en",
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;


