// generic all keys must be type of Href<string | object>

import { Href } from "expo-router";

interface IAppRoutes {
  [key: string]: {
    [subkey: string]: Href<string | object>
  }

}

const APP_ROUTES: IAppRoutes = {
  PUBLIC: {
    SIGNIN: "/(public)/signin",
    SIGNUP: "/(public)/signup",
    WELCOME: "/(public)/welcome",
  },
  TABS: {
    TIMELINE: "/(tabs)/timeline"
  }
};

export default APP_ROUTES;
