import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import enGoals from './locales/en/goals.json';
import enArchive from './locales/en/archive.json'
import enGoalCard from './locales/en/goalcard.json'
import enCategories from './locales/en/categories.json'
import engoaldetails from './locales/en/goaldetails.json'
import engoalform from './locales/en/goalform.json'
import enSettings from './locales/en/settings.json'
import enError from './locales/en/error.json'
import endashboard from './locales/en/dashboard.json'

import psCommon from './locales/ps/common.json';
import psGoals from './locales/ps/goals.json';
import psArchive from './locales/ps/archive.json'
import psGoalCard from './locales/ps/goalCard.json'
import psCategories from './locales/ps/categories.json'
import psgoaldetails from './locales/ps/goaldetails.json'
import psgoalform from './locales/ps/goalform.json'
import psSettings from './locales/ps/settings.json'
import psError from './locales/ps/error.json'
import psdashboard from './locales/ps/dashboard.json'


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        goals: enGoals,
        archive: enArchive,
        goalCard: enGoalCard,
        categories: enCategories,
        goaldetails: engoaldetails,
        goalForm: engoalform,
        settings: enSettings,
        error: enError,    //  ****notFound
        dashboard: endashboard
      
      },
      ps: {
        common: psCommon,
        goals: psGoals,
        archive: psArchive,
        goalCard: psGoalCard,
        categories: psCategories,
        goaldetails: psgoaldetails,
        goalForm:  psgoalform,
        settings: psSettings,
        error: psError,
        dashboard: psdashboard

      }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ps'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    ns: ['common', 'goals', 'archive', 'goalCard','categories','goaldetails','goalForm','settings','error','dashboard'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed'
    }
  });

export default i18n;
