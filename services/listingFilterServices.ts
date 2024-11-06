import IListingCategory from '@/interfaces/listing/IListingCategory';
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'
import IQueryParams from '@/interfaces/app/IQueryParams';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IListingMostSearchedKey from '@/interfaces/listing/IListingMostSearchedKey';
import IListingPost from '@/interfaces/listing/IListingPost';

const LISTING_FILTER_API_REDUCER_PATH = 'listingFilterAPI'
const LISTING_FILTER_API_TAG = "listingFilterTag"

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof LISTING_FILTER_API_TAG,
  typeof LISTING_FILTER_API_REDUCER_PATH
>

const getListingCategories = (builder: IBuilder) => {
  return builder.query<IListingCategory[], IQueryParams | void>({
    query(params = undefined) {
      return {
        url: `/categories`,
        method: 'GET',
        params: params ?? {},
      }
    },
    providesTags: [LISTING_FILTER_API_TAG],
  })
}

const getMostSearchedKeys = (builder: IBuilder) => {
  return builder.query<IListingMostSearchedKey[], IListingQueryParams>({
    query(params) {
      return {
        url: `/listings/most-searched`,
        method: 'GET',
        params: params ?? {
        },
      }
    },
    providesTags: [LISTING_FILTER_API_TAG],
  })
}



const getNewestPosts = (builder: IBuilder) => {
  return builder.query<IListingPost[], IListingQueryParams | void>({
    query(params) {
      return {
        url: `/listings/newest`,
        method: 'GET',
        params: params ?? {
        },
      }
    },
    providesTags: [LISTING_FILTER_API_TAG],
  })
}


const createFavorite = (builder: IBuilder) => {
  return builder.mutation<unknown, any['kitchenId']>({
    query(kitchenId) {
      return {
        url: `/v1/favorites/${kitchenId}/add`,
        method: 'POST',
        data: { kitchenId },
      }
    },
    invalidatesTags: [LISTING_FILTER_API_TAG],
  })
}


const listingFilterApiSlice = createApi({
  reducerPath: LISTING_FILTER_API_REDUCER_PATH,
  tagTypes: [LISTING_FILTER_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getListingCategories: getListingCategories(builder),
    getMostSearchedKeys: getMostSearchedKeys(builder),
    getNewestPosts: getNewestPosts(builder)
  }),
})

const { useGetListingCategoriesQuery, useGetMostSearchedKeysQuery, useGetNewestPostsQuery } = listingFilterApiSlice

export { listingFilterApiSlice, useGetListingCategoriesQuery, useGetMostSearchedKeysQuery, useGetNewestPostsQuery }



