import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import { getLocales } from 'expo-localization';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import mk from '@/locales/mk.json';
import bs from '@/locales/bs.json';


// console.log("Localization.locale.split('-')", getLocales())
i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      de: { translation: de },
      mk: { translation: mk },
      bs: { translation: bs },

    },
    lng: "en",
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;


