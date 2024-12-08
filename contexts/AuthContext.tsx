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

const AuthContext = createContext<{
  signIn: (loginResult: ILoginResult) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
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
  const [refreshToken, setRefreshToken] = useStorageState(
    APP_STORAGE_KEYS.REFRESH_TOKEN
  );
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
    dispatch(accountApiSlice.util.invalidateTags([ACCOUNT_API_TAG]));
    dispatch(accountApiSlice.util.resetApiState());

    setSession(null);
    setRefreshToken(null);
    setRefreshTokenExpiryTime(null);
    apiClient.defaults.headers.common['Authorization'] = '';
    router.push(APP_ROUTES.PUBLIC.WELCOME);
  };

  const refreshAuthToken = async () => {
    try {
      const response = await apiClient.post('/refresh', { refreshToken });
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
      throw error;
    }
  };

  // Axios interceptor to add token to each request
  apiClient.interceptors.request.use(
    async (config) => {
      if (session) {
        config.headers.Authorization = `Bearer ${session}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Axios response interceptor for handling 401 errors
  // apiClient.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     console.log('------errr SessionProvider -----', error);

  //     const originalRequest = error.config;
  //     if (error.response?.status === 401 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       const newToken = await refreshAuthToken();
  //       originalRequest.headers.Authorization = `Bearer ${newToken}`;
  //       return apiClient(originalRequest);
  //     }
  //     return Promise.reject(error);
  //   }
  // );

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
