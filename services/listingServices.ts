import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';
import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { ACCOUNT_API_TAG, LISTING_API_TAG } from './apiTags';

import IListingPost from '@/interfaces/listing/IListingPost';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IPaginationResult from '@/interfaces/app/IPaginationResult';
import IListingCreateDTO from '@/interfaces/listing/IListingCreateDTO';
import { map } from 'lodash';
import IListingFavorite from '@/interfaces/listing/IListingFavorite';
import IUser from '@/interfaces/account/IUser';
import { accountApiSlice } from './accountServices';
import IChatConversation from '@/interfaces/chat/IChatConversation';

const LISTING_API_REDUCER_PATH = 'listingAPI'

type TagTypes = typeof LISTING_API_TAG | typeof ACCOUNT_API_TAG;

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  TagTypes,
  typeof LISTING_API_REDUCER_PATH
>


const blockFromChat = (builder: IBuilder) => {
  return builder.mutation<IListingPost[], IChatConversation["chatRegistryId"]>({
    query(chatRegistryId) {
      return {
        url: `/block/block-chat`,
        method: 'POST',
        data: {
          chatRegistryId
        }
      }
    },
    invalidatesTags: [LISTING_API_TAG],
  })
}

const blockListingItem = (builder: IBuilder) => {
  return builder.mutation<IListingPost[], IListingPost["id"]>({
    query(listingId) {
      return {
        url: `/block/block-content`,
        method: 'POST',
        data: {
          listingId
        }
      }
    },
    invalidatesTags: [LISTING_API_TAG],
  })
}

const getUsersListingItems = (builder: IBuilder) => {
  return builder.query<IListingPost[], IUser["id"]>({
    query(id) {
      return {
        url: `/users/${id}/my-listings/0`,
        method: 'GET',
      }
    },
    providesTags: [LISTING_API_TAG],
  })
}

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


const getViewCount = (builder: IBuilder) => {
  return builder.query<number, IListingPost["id"]>({
    query(id) {
      return {
        url: `/listings/${id}/view-count`,
        method: 'GET',
      }
    },
    providesTags: [LISTING_API_TAG],
  })
}

const createListing = (builder: IBuilder) => {
  return builder.mutation<IListingPost["id"], IListingCreateDTO>({
    query(data) {
      const options = data.options ? map(data.options, (d) => {
        if (typeof d?.value === "boolean") {
          return { ...d, value: d.value.toString() }
        }
        return d
      }) : [];

      return {
        url: `/listings`,
        method: 'POST',
        data: {
          ...data,
          options
        }
      }
    },
    async onQueryStarted(_, { dispatch, queryFulfilled }) {
      try {
        await queryFulfilled;
        dispatch(
          accountApiSlice.util.invalidateTags([ACCOUNT_API_TAG, LISTING_API_TAG])
        );
      } catch { }
    },
    invalidatesTags: [LISTING_API_TAG, ACCOUNT_API_TAG],
  })
}


const deleteListing = (builder: IBuilder) => {
  return builder.mutation<IListingPost["id"], string>({
    query(listingId) {
      return {
        url: `/listings/${listingId}`,
        method: 'DELETE',
      }
    },
    invalidatesTags: [LISTING_API_TAG, ACCOUNT_API_TAG],
  })
}




const getListingFavorites = (builder: IBuilder) => {
  return builder.query<IListingFavorite[], void>({
    query(data) {
      return {
        url: `/users/favorite`,
        method: 'GET',

      }
    },
    providesTags: [LISTING_API_TAG],
  })
}



const addListingFavorite = (builder: IBuilder) => {
  return builder.mutation<IListingPost["id"], { listingId: IListingPost["id"] }>({
    query(data) {
      return {
        url: `/users/favorite`,
        method: 'POST',
        data: {
          ...data,
        }
      }
    },
    invalidatesTags: [LISTING_API_TAG],
  })
}



const removeListingFavorite = (builder: IBuilder) => {
  return builder.mutation<IListingPost["id"], { id: IListingPost["id"] }>({
    query(data) {
      return {
        url: `/users/favorite`,
        method: 'DELETE',
        data: {
          ...data,
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
  tagTypes: [LISTING_API_TAG, ACCOUNT_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    blockFromChat: blockFromChat(builder),
    blockListingItem: blockListingItem(builder),
    deleteListing: deleteListing(builder),
    getUsersListingItems: getUsersListingItems(builder),
    getListingItems: getListingItems(builder),
    getNewestPosts: getNewestPosts(builder),
    createListing: createListing(builder),
    getListingItemDetails: getListingItemDetails(builder),
    uploadListingMedia: uploadListingMedia(builder),
    addListingFavorite: addListingFavorite(builder),
    removeListingFavorite: removeListingFavorite(builder),
    getListingFavorites: getListingFavorites(builder),
    getViewCount: getViewCount(builder)
  }),
})

const { useBlockFromChatMutation, useDeleteListingMutation, useBlockListingItemMutation, useGetUsersListingItemsQuery, useGetListingItemsQuery, useLazyGetListingItemsQuery, useGetNewestPostsQuery, useCreateListingMutation, useGetListingItemDetailsQuery, useUploadListingMediaMutation, useAddListingFavoriteMutation, useRemoveListingFavoriteMutation, useGetListingFavoritesQuery, useGetViewCountQuery } = listingApiSlice

export { listingApiSlice, useBlockFromChatMutation, useDeleteListingMutation, useBlockListingItemMutation, useGetUsersListingItemsQuery, useGetListingItemsQuery, useGetNewestPostsQuery, useCreateListingMutation, useGetListingItemDetailsQuery, useUploadListingMediaMutation, useAddListingFavoriteMutation, useRemoveListingFavoriteMutation, useGetListingFavoritesQuery, useGetViewCountQuery, useLazyGetListingItemsQuery }



