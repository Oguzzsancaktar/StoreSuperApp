
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'

import IListingPost from '@/interfaces/listing/IListingPost';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IPaginationResult from '@/interfaces/app/IPaginationResult';
import IListingCreateDTO from '@/interfaces/listing/IListingCreateDTO';
import { map } from 'lodash';

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
    providesTags: [LISTING_API_TAG],
  })
}

const createListing = (builder: IBuilder) => {
  return builder.mutation<IListingPost[], IListingCreateDTO>({
    query(data) {
      return {
        url: `/listings`,
        method: 'POST',
        data: {
          ...data,
          options: map(data.options, (d) => {
            if (typeof d.value === "boolean") {
              return { ...d, value: d.value.toString() }
            }
            return d
          })
        }
      }
    },
    invalidatesTags: [LISTING_API_TAG],
  })
}


const uploadListingMedia = (builder: IBuilder) => {
  return builder.mutation<string[], IListingCreateDTO["media"]>({
    query(formData) {
      return {
        url: `/listings/add-media`,
        method: 'POST',
        data: formData,
        headers: {
          'Authorization': undefined,
          'Accept': 'application/json',
          'Accept-Language': 'en-US',
        }
      }
    },
    invalidatesTags: [LISTING_API_TAG],
  })
}

const getListingItemDetails = (builder: IBuilder) => {
  return builder.query<IListingPost, IListingPost["id"]>({
    query(listingId) {
      return {
        url: `/listings/${listingId}`,
        method: 'GET',
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
    getNewestPosts: getNewestPosts(builder),
    createListing: createListing(builder),
    getListingItemDetails: getListingItemDetails(builder),
    uploadListingMedia: uploadListingMedia(builder)
  }),
})

const { useGetListingItemsQuery, useGetNewestPostsQuery, useCreateListingMutation, useGetListingItemDetailsQuery, useUploadListingMediaMutation } = listingApiSlice

export { listingApiSlice, useGetListingItemsQuery, useGetNewestPostsQuery, useCreateListingMutation, useGetListingItemDetailsQuery, useUploadListingMediaMutation }



