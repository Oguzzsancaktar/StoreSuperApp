// generic all keys must be type of Href<string | object>

import { Href } from "expo-router";

export interface IAppRoutes {
  [key: string]: {
    [subkey: string]: Href<string | object>
  }
}

const APP_ROUTES: IAppRoutes = {
  DRAWER: {

    PRIVACY_POLICY: "/(drawer)/settings/privacyPolicy",

    SETTINGS: "/(drawer)/settings",
    FAVORITES: "/(drawer)/favorites",
    SUCCESS: "/(drawer)/success",
  },
  PRIVATE: {

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
  TABS: {
    TIMELINE: "/(tabs)/timeline",
    PROFILE: "/(tabs)/profile"
  }
} as const


export default APP_ROUTES;
