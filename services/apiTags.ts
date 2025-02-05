import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../config/axiosBaseQuery';

export const LISTING_API_TAG = "listingTag";
export const ACCOUNT_API_TAG = "accountTag";

export type ApiTagTypes = typeof LISTING_API_TAG | typeof ACCOUNT_API_TAG;

// Base API with reset functionality
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  tagTypes: [LISTING_API_TAG, ACCOUNT_API_TAG],
});

// Export a reset action that can be used to reset all API states
export const resetApiState = () => ({
  type: 'api/reset'
}); 
