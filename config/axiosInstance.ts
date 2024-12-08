import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://ngx-marketplace-api-dev.azurewebsites.net/api/v1',
  timeout: 30000,
  headers: {
    'Accept-Language': "en-US"
  }
});


export default apiClient;
