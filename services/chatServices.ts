
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'

import IChatConversation from '@/interfaces/chat/IChatConversation';
import IChatMessage from '@/interfaces/chat/IChatMessage';
import IChatCreateDTO from '@/interfaces/chat/IChatCreateDTO';

const CHAT_API_REDUCER_PATH = 'chatAPI'
export const CHAT_API_TAG = "chatTag"

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
    providesTags: [],
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

const deleteChat = (builder: IBuilder) => {
  return builder.mutation<string, string>({
    query(data) {
      return {
        url: `/message/chatList/${data}`,
        method: 'DELETE',
      }
    },
    invalidatesTags: [CHAT_API_TAG],
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
    deleteChat: deleteChat(builder),
    getChatList: getChatList(builder),
    getChatMessages: getChatMessages(builder),
    createMessage: createMessage(builder),
  }),
})

const { useCreateMessageMutation, useDeleteChatMutation, useGetChatListQuery, useLazyGetChatListQuery, useGetChatMessagesQuery, useLazyGetChatMessagesQuery } = chatApiSlice

export { chatApiSlice, useCreateMessageMutation, useDeleteChatMutation, useLazyGetChatListQuery, useGetChatListQuery, useGetChatMessagesQuery, useLazyGetChatMessagesQuery }



