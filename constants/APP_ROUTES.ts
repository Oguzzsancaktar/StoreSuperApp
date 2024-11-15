// generic all keys must be type of Href<string | object>

import { Href } from "expo-router";

interface IAppRoutes {
  [key: string]: {
    [subkey: string]: Href<string | object>
  }
}

const APP_ROUTES: IAppRoutes = {
  PUBLIC: {
    LOGIN: "/(public)/login",
    REGISTER: "/(public)/register",
    WELCOME: "/(public)/welcome",
  },
  TABS: {
    TIMELINE: "/(tabs)/timeline",
    PROFILE: "/(tabs)/profile"
  }
};

export default APP_ROUTES;
