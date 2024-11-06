
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'

import IListingPost from '@/interfaces/listing/IListingPost';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IPaginationResult from '@/interfaces/app/IPaginationResult';

const LISTING_API_REDUCER_PATH = 'listingAPI'
const LISTING_API_TAG = "listingTag"

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof LISTING_API_TAG,
  typeof LISTING_API_REDUCER_PATH
>

const getListingItems = (builder: IBuilder) => {
  return builder.query<IPaginationResult<IListingPost>, IListingQueryParams>({
    query(params) {
      return {
        url: `/listings/filter`,
        method: 'GET',
        params: params ?? {},
      }
    },
    providesTags: [LISTING_API_TAG],
  })
}

const listingApiSlice = createApi({
  reducerPath: LISTING_API_REDUCER_PATH,
  tagTypes: [LISTING_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getListingItems: getListingItems(builder),
  }),
})

const { useGetListingItemsQuery } = listingApiSlice

export { listingApiSlice, useGetListingItemsQuery }



