// generic all keys must be type of Href<string | object>

import { Href } from "expo-router";

export interface IAppRoutes {
  [key: string]: {
    [subkey: string]: Href<string | object>
  }
}

const APP_ROUTES: IAppRoutes = {


  PRIVATE: {
    SETTINGS_UPDATE_ACCOUNT: "/(private)/settings/updateAccount",
    SETTINGS_UPDATE_PASSWORD: "/(private)/settings/updatePassword",

    SETTINGS_UPDATE_INFORMATIONS: "/(private)/settings/updateInformations",
    SETTINGS_PERSONAL_INFORMATIONS: "/(private)/settings/personalInformations",
    SETTINGS_CONTACT_INFORMATIONS: "/(private)/settings/contactInformations",
    SETTINGS_ADDRESS_INFORMATIONS: "/(private)/settings/addressInformations",
  },

  PUBLIC: {
    LOGIN: "/(public)/login",
    REGISTER: "/(public)/register",
    WELCOME: "/(public)/welcome",
  },

  DRAWER: {
    PRIVACY_POLICY: "/(public)/(drawer)/settings/privacyPolicy",
    SETTINGS: "/(public)/(drawer)/settings",
    FAVORITES: "/(public)/(drawer)/favorites",
    SUCCESS: "/(public)/(drawer)/success",
  },

  TABS: {
    TIMELINE: "/(tabs)/timeline",
    PROFILE: "/(tabs)/profile"
  }
} as const


export default APP_ROUTES;
