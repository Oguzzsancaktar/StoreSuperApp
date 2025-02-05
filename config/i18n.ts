import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocales } from 'expo-localization';
import en from '@/locales/en-US.json';
import de from '@/locales/de-DE.json';
import mk from '@/locales/mk-MK.json';
import bs from '@/locales/bs-BA.json';


// console.log("Localization.locale.split('-')", getLocales())
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      'en-US': { translation: en },
      'de-DE': { translation: de },
      'mk-MK': { translation: mk },
      'bs-BA': { translation: bs },

    },
    lng: "en-US",
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
  });

export default i18n;


