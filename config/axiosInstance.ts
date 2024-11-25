import APP_ROUTES from '@/constants/APP_ROUTES';
import APP_STORAGE_KEYS from '@/constants/APP_STORAGE_KEYS';
import { setStorageItemAsync } from '@/hooks/useStorageState';
import axios from 'axios';
import { router } from 'expo-router';

const apiClient = axios.create({
  baseURL: 'https://ngx-marketplace-api-dev.azurewebsites.net/api/v1',
  timeout: 30000,
  headers: {
    'Accept-Language': "en-US"
  }
});

let isRedirecting = false; // Prevent multiple redirects

apiClient.interceptors.request.use(
  config => {
    // Add authorization token or other headers if needed
    // const token = localStorage.getItem('authToken'); // Fetch from secure storage
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  async error => {
    console.log("----error----", error);

    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true; // Tekrar yönlendirme yapılmasını engelle
      setStorageItemAsync(APP_STORAGE_KEYS.AUTH_SESSION, null)
      router.replace(APP_ROUTES.PUBLIC.WELCOME); // Welcome ekranına yönlendir
    }
    return Promise.reject(error);

    if (error.response?.status === 401 && !isRedirecting) {
      isRedirecting = true; // Block further redirects until resolved
      try {
        // Optionally attempt a token refresh before redirecting
        // const refreshToken = localStorage.getItem('refreshToken'); // Fetch from secure storage
        // if (refreshToken) {
        //   const refreshResponse = await axios.post(
        //     'https://ngx-marketplace-api-dev.azurewebsites.net/api/v1/auth/refresh',
        //     { refreshToken }
        //   );

        //   const { token, newRefreshToken } = refreshResponse.data;
        //   localStorage.setItem('authToken', token);
        //   localStorage.setItem('refreshToken', newRefreshToken);

        //   // Retry the failed request with the new token
        //   error.config.headers.Authorization = `Bearer ${token}`;
        //   return apiClient.request(error.config);
        // }
        return
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // If refresh fails, redirect to login
        router.replace(APP_ROUTES.PUBLIC.WELCOME);
      } finally {
        isRedirecting = false; // Reset the flag
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
