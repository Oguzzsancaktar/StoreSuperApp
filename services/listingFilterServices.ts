import IListingCategory from '@/interfaces/listing/IListingCategory';
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'
import IQueryParams from '@/interfaces/app/IQueryParams';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IListingMostSearchedKey from '@/interfaces/listing/IListingMostSearchedKey';
import IListingCategorySub from '@/interfaces/listing/IListingCategorySub';
import ICountry from '@/interfaces/common/address/ICountry';
import ICity from '@/interfaces/common/address/ICity';
import IListingCategoryOption from '@/interfaces/listing/IListingCategoryOption';
import IDistrict from '@/interfaces/common/address/IDistrict';
import IListingFilterOption from '@/interfaces/listing/IListingFilterOption';

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
const getDistricts = (builder: IBuilder) => {
  return builder.query<IDistrict[], number>({
    query(cityId) {
      return {
        url: `/districts`,
        method: 'GET',
        params: { cityId }
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

const getListingCategoryOptions = (builder: IBuilder) => {
  return builder.query<IListingCategoryOption[], IListingCategory["id"]>({
    query(categoryId) {
      return {
        url: `/categories/${categoryId}/options`,
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



const getListingFilters = (builder: IBuilder) => {
  return builder.query<IListingFilterOption[], { categoryId: IListingCategory["id"], subCategory: string }>({
    query({ categoryId, subCategory }) {
      return {
        url: `/categories-mobile/${categoryId}/filters`,
        method: 'GET',
        params: {
          subCategory
        }
      }
    },
    providesTags: [LISTING_FILTER_API_TAG],
  })
}



const listingFilterApiSlice = createApi({
  reducerPath: LISTING_FILTER_API_REDUCER_PATH,
  tagTypes: [LISTING_FILTER_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCountries: getCountries(builder),
    getCities: getCities(builder),
    getDistricts: getDistricts(builder),
    getListingCategories: getListingCategories(builder),
    getMostSearchedKeys: getMostSearchedKeys(builder),
    getListingCategorySubs: getListingCategorySubs(builder),
    getListingCategoryOptions: getListingCategoryOptions(builder),
    getListingFilters: getListingFilters(builder)
  }),
})

const {
  useGetCountriesQuery,
  useGetCitiesQuery,
  useGetDistrictsQuery,
  useGetListingCategoriesQuery,
  useGetMostSearchedKeysQuery,
  useGetListingCategorySubsQuery,
  useGetListingCategoryOptionsQuery,
  useGetListingFiltersQuery
} = listingFilterApiSlice

export {
  listingFilterApiSlice,
  useGetCountriesQuery,
  useGetCitiesQuery,
  useGetDistrictsQuery,
  useGetListingCategoriesQuery,
  useGetMostSearchedKeysQuery,
  useGetListingCategorySubsQuery,
  useGetListingCategoryOptionsQuery,
  useGetListingFiltersQuery
}



