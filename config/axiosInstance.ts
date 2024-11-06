import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://ngx-marketplace-api-dev.azurewebsites.net/api/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  config => {
    // Add authorization token or other headers if needed
    // const token = 'your-auth-token'; // Fetch from a secure source
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
  error => {
    console.log("----error----", error)
    // Handle errors globally
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error);
  }
);


export default apiClient;
