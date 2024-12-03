
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'

import IListingPost from '@/interfaces/listing/IListingPost';
import IListingQueryParams from '@/interfaces/listing/IListingQueryParams';
import IPaginationResult from '@/interfaces/app/IPaginationResult';
import IListingCreateDTO from '@/interfaces/listing/IListingCreateDTO';
import { map } from 'lodash';
import IChatConversation from '@/interfaces/chat/IChatConversation';
import IChatMessage from '@/interfaces/chat/IChatMessage';
import IChatCreateDTO from '@/interfaces/chat/IChatCreateDTO';

const CHAT_API_REDUCER_PATH = 'chatAPI'
const CHAT_API_TAG = "chatTag"

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof CHAT_API_TAG,
  typeof CHAT_API_REDUCER_PATH
>

const getChatList = (builder: IBuilder) => {
  return builder.query<IChatConversation[], void>({
    query() {
      return {
        url: `/message/chatList`,
        method: 'GET',
      }
    },
    providesTags: [CHAT_API_TAG],
  })
}


const getChatMessages = (builder: IBuilder) => {
  return builder.query<IChatMessage[], IChatConversation["chatRegistryId"]>({
    query(chatRegistryId) {
      return {
        url: `/message/chatMessages`,
        method: 'GET',
        params: {
          chatRegistryId
        },
      }
    },
    providesTags: [CHAT_API_TAG],
  })
}

const createMessage = (builder: IBuilder) => {
  return builder.mutation<string, IChatCreateDTO>({
    query(data) {
      return {
        url: `/message/sendMessage`,
        method: 'POST',
        data: {
          ...data,
        }
      }
    },
    invalidatesTags: [CHAT_API_TAG],
  })
}


const chatApiSlice = createApi({
  reducerPath: CHAT_API_REDUCER_PATH,
  tagTypes: [CHAT_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getChatList: getChatList(builder),
    getChatMessages: getChatMessages(builder),
    createMessage: createMessage(builder),
  }),
})

const { useCreateMessageMutation, useGetChatListQuery, useGetChatMessagesQuery } = chatApiSlice

export { chatApiSlice, useCreateMessageMutation, useGetChatListQuery, useGetChatMessagesQuery }



