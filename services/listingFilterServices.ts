import IListingCategory from '@/interfaces/listing/IListingCategory';
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'
import IQueryParams from '@/interfaces/app/IQueryParams';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IListingMostSearchedKey from '@/interfaces/listing/IListingMostSearchedKey';
import IListingCategorySub from '@/interfaces/listing/IListingCategorySub';
import ICountry from '@/interfaces/common/address/ICountry';
import ICity from '@/interfaces/common/address/ICity';

const LISTING_FILTER_API_REDUCER_PATH = 'listingFilterAPI'
const LISTING_FILTER_API_TAG = "listingFilterTag"

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof LISTING_FILTER_API_TAG,
  typeof LISTING_FILTER_API_REDUCER_PATH
>

const getCountries = (builder: IBuilder) => {
  return builder.query<ICountry[], void>({
    query() {
      return {
        url: `/countries`,
        method: 'GET',
      }
    },
    providesTags: [LISTING_FILTER_API_TAG],
  })
}

const getCities = (builder: IBuilder) => {
  return builder.query<ICity[], number>({
    query(countryId) {
      return {
        url: `/city`,
        method: 'GET',
        params: { countryId }
      }
    },
    providesTags: [LISTING_FILTER_API_TAG],
  })
}


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

const getListingCategorySubs = (builder: IBuilder) => {
  return builder.query<IListingCategory[], IListingCategory["id"]>({
    query(categoryId) {
      return {
        url: `/categories/${categoryId}/sub`,
        method: 'GET',
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
  return builder.query<IListingCategorySub[], IListingQueryParams | void>({
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
    getCountries: getCountries(builder),
    getCities: getCities(builder),
    getListingCategories: getListingCategories(builder),
    getMostSearchedKeys: getMostSearchedKeys(builder),
    getListingCategorySubs: getListingCategorySubs(builder),
    getNewestPosts: getNewestPosts(builder),

  }),
})

const {
  useGetCountriesQuery,
  useGetCitiesQuery,
  useGetListingCategoriesQuery,
  useGetMostSearchedKeysQuery,
  useGetNewestPostsQuery,
  useGetListingCategorySubsQuery,

} = listingFilterApiSlice

export {
  listingFilterApiSlice,
  useGetCountriesQuery,
  useGetCitiesQuery,
  useGetListingCategoriesQuery,
  useGetMostSearchedKeysQuery,
  useGetNewestPostsQuery,
  useGetListingCategorySubsQuery
}



