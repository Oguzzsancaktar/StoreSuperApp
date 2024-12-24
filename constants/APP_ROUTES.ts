import { Href } from "expo-router";

interface IAppRoutes {
  PRIVATE: {
    CHAT: {
      CHAT_REGISTRY: Href,
    },
    SETTINGS: {
      ADDRESS_INFO: Href,
      CONTACT_INFO: Href,
      PERSONAL_INFO: Href,
      UPDATE_ACCOUNT: Href,
      UPDATE_PASSWORD: Href,
    },
  },
  PUBLIC: {
    DRAWER: {
      SETTINGS: {
        LIST: Href,
      },
      POST: {
        LISTING: Href,
      },
      PROFILE: Href,
      FAVORITES: Href,
      SUCCESS: Href,
    },
    UNAUTHORIZED: {
      LOGIN: Href,
      REGISTER: Href,
      WELCOME: Href,
    },
  },
  TABS: {
    ADD_POST: Href,
    MESSAGES: Href,
    POST_LIST: Href,
    PROFILE: Href,
    TIMELINE: Href,
  },
};
export const APP_ROUTES: IAppRoutes = {
  PRIVATE: {
    CHAT: {
      CHAT_REGISTRY: "/(private)/chat/[chatRegistryId]",
    },
    SETTINGS: {
      ADDRESS_INFO: "/(private)/settings/addressInformations",
      CONTACT_INFO: "/(private)/settings/contactInformations",
      PERSONAL_INFO: "/(private)/settings/personalInformations",
      UPDATE_ACCOUNT: "/(private)/settings/updateAccount",
      UPDATE_PASSWORD: "/(private)/settings/updatePassword",
    },
  },
  PUBLIC: {
    DRAWER: {
      SETTINGS: {
        LIST: "/(public)/(drawer)/settings"
      },
      POST: {
        LISTING: "/(public)/(drawer)/post/[listingId]",
      },
      PROFILE: "/(public)/(drawer)/post/settings/[profileId]",
      FAVORITES: "/(public)/(drawer)/post/settings/favorites",
      SUCCESS: "/(public)/(drawer)/post/settings/success",
    },
    UNAUTHORIZED: {
      LOGIN: "/(public)/(unauthorized)/login",
      REGISTER: "/(public)/(unauthorized)/register",
      WELCOME: "/(public)/(unauthorized)/welcome",
    },
  },
  TABS: {
    ADD_POST: "/(tabs)/addPost",
    MESSAGES: "/(tabs)/messages",
    POST_LIST: "/(tabs)/postList",
    PROFILE: "/(tabs)/profile",
    TIMELINE: "/(tabs)/timeline",
  },
};

export default APP_ROUTES;
