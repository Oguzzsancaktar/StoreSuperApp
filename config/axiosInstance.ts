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
  }
);

export default apiClient;
