// generic all keys must be type of Href<string | object>

import { Href } from "expo-router";

export interface IAppRoutes {
  [key: string]: {
    [subkey: string]: Href<string | object>
  }
}

const APP_ROUTES: IAppRoutes = {
  DRAWER: {
    SETTINGS: "/(drawer)/settings",
    SUCCESS: "/(drawer)/success",
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
