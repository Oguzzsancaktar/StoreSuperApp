import {
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useDispatch } from "react-redux";

import apiClient from "@/config/axiosInstance";
import APP_STORAGE_KEYS from "@/constants/APP_STORAGE_KEYS";
import { useStorageState } from "@/hooks/useStorageState";
import ILoginResult from "@/interfaces/account/ILoginResult";
import IJwtDecodedUser from "@/interfaces/common/jwt/IJwtDecodedUser";
import { accountApiSlice } from "@/services/accountServices";
import jwtUtils from "@/utils/jwtUtils";

const AuthContext = createContext({
  signIn: (loginResult: ILoginResult) => {},
  signOut: () => {},
  authToken: null as string | null,
  userTokenInfo: undefined as IJwtDecodedUser | undefined,
});

export function useAppAuthSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useAppAuthSession must be wrapped in a <SessionProvider />",
      );
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  const [[authTokenIsLoading, authToken], setSession] = useStorageState(
    APP_STORAGE_KEYS.AUTH_TOKEN,
  );

  const [[isRefreshTokenLoading, refreshToken], setRefreshToken] =
    useStorageState(APP_STORAGE_KEYS.REFRESH_TOKEN);
  const [refreshTokenExpiryTime, setRefreshTokenExpiryTime] = useStorageState(
    APP_STORAGE_KEYS.REFRESH_TOKEN_EXPIRY,
  );

  const userTokenInfo = useMemo(() => {
    const info = authToken ? jwtUtils.userJwtDecode(authToken) : undefined;
    return info;
  }, [authToken]);

  const signIn = ({
    token,
    refreshToken,
    refreshTokenExpiryTime,
  }: ILoginResult) => {
    setSession(token);
    setRefreshToken(refreshToken);
    setRefreshTokenExpiryTime(refreshTokenExpiryTime);
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const signOut = () => {
    console.log("signOut worked");

    // Reset Redux state and local storage
    dispatch(accountApiSlice.util.resetApiState());
    setSession(null);
    setRefreshToken(null);
    setRefreshTokenExpiryTime(null);

    // Remove Authorization header
    delete apiClient.defaults.headers.common["Authorization"];
  };

  let isRefreshing = false;
  let refreshSubscribers: Array<(token: string) => void> = [];

  const onRefreshed = (newToken: string) => {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
  };

  const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
  };

  const refreshAuthToken = async () => {
    try {
      signOut();

      const response = await apiClient.post("/refresh-token", {
        token: authToken,
        refreshToken,
      });

      const {
        token: newToken,
        refreshToken: newRefreshToken,
        refreshTokenExpiryTime: newExpiry,
      } = response.data;

      setSession(newToken);
      setRefreshToken(newRefreshToken);
      setRefreshTokenExpiryTime(newExpiry);

      apiClient.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

      return newToken;
    } catch (error) {
      console.error("Failed to refresh token", error);
      signOut();
      throw error;
    }
  };

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        } else {
          delete config.headers.Authorization;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Add response interceptor
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve) => {
              addRefreshSubscriber((newToken) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(apiClient(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const newToken = await refreshAuthToken();
            isRefreshing = false;
            onRefreshed(newToken);

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            signOut();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        authToken,
        userTokenInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
