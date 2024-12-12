import {
  createContext,
  useContext,
  useEffect,
  type PropsWithChildren,
} from 'react';
import APP_STORAGE_KEYS from '@/constants/APP_STORAGE_KEYS';
import { useStorageState } from '@/hooks/useStorageState';

import ILoginResult from '@/interfaces/account/ILoginResult';
import apiClient from '@/config/axiosInstance';
import { router } from 'expo-router';
import APP_ROUTES from '@/constants/APP_ROUTES';
import { useDispatch } from 'react-redux';
import { ACCOUNT_API_TAG, accountApiSlice } from '@/services/accountServices';

const AuthContext = createContext({
  signIn: (loginResult: ILoginResult) => {},
  signOut: () => {},
  session: null as string | null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  const [[isLoading, session], setSession] = useStorageState(
    APP_STORAGE_KEYS.AUTH_SESSION
  );

  const [[isRefreshTokenLoading, refreshToken], setRefreshToken] =
    useStorageState(APP_STORAGE_KEYS.REFRESH_TOKEN);
  const [refreshTokenExpiryTime, setRefreshTokenExpiryTime] = useStorageState(
    APP_STORAGE_KEYS.REFRESH_TOKEN_EXPIRY
  );

  const signIn = ({
    token,
    refreshToken,
    refreshTokenExpiryTime,
  }: ILoginResult) => {
    setSession(token);
    setRefreshToken(refreshToken);
    setRefreshTokenExpiryTime(refreshTokenExpiryTime);
  };

  const signOut = () => {
    console.log('signOut worked');
    dispatch(accountApiSlice.util.invalidateTags([ACCOUNT_API_TAG]));
    dispatch(accountApiSlice.util.resetApiState());

    setSession(null);
    setRefreshToken(null);
    setRefreshTokenExpiryTime(null);
    apiClient.defaults.headers.common['Authorization'] = '';
    router.push(APP_ROUTES.PUBLIC.WELCOME);
  };

  let isRefreshing = false;
  let refreshSubscribers: Array<(token: string) => void> = [];

  function onRefreshed(newToken: string) {
    refreshSubscribers.forEach((callback) => callback(newToken));
    refreshSubscribers = [];
  }

  function addRefreshSubscriber(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
  }

  const refreshAuthToken = async () => {
    try {
      const response = await apiClient.post('/refresh-token', {
        token: session,
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

      return newToken;
    } catch (error) {
      console.log('error refresh');
      signOut();
      throw error;
    }
  };

  apiClient.interceptors.request.use(
    (config) => {
      if (session) {
        config.headers.Authorization = `Bearer ${session}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      setSession(null);

      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log('----', isRefreshing);

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
          console.log('refreshErrorrefreshError', refreshError);
          isRefreshing = false;
          signOut();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
