
import IRegisterDTO from '@/interfaces/account/IRegisterDTO';
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'
import ILoginDTO from '@/interfaces/account/ILoginDTO';
import ILoginResult from '@/interfaces/account/ILoginResult';
import IUser from '@/interfaces/account/IUser';


const ACCOUNT_API_REDUCER_PATH = 'accountAPI'
const ACCOUNT_API_TAG = "accountTag"

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof ACCOUNT_API_TAG,
  typeof ACCOUNT_API_REDUCER_PATH
>

const registerAccount = (builder: IBuilder) => {
  return builder.mutation<string[], IRegisterDTO>({
    query(data) {
      return {
        url: `/account/register`,
        method: 'POST',
        data
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


const loginAccount = (builder: IBuilder) => {
  return builder.mutation<ILoginResult, ILoginDTO>({
    query(data) {
      return {
        url: `/account/login/mail`,
        method: 'POST',
        data
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


const loginWithGoogle = (builder: IBuilder) => {
  return builder.mutation<ILoginResult, string>({
    query(token) {
      return {
        url: `/account/login/google`,
        method: 'POST',
        data: {
          accessToken: token,
        }
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


// User
const getCurrentUserInformation = (builder: IBuilder) => {
  return builder.query<IUser, void>({
    query() {
      return {
        url: `/users/currentUser`,
        method: 'GET',
      }
    },
    providesTags: [ACCOUNT_API_TAG],
  })
}


const accountApiSlice = createApi({
  reducerPath: ACCOUNT_API_REDUCER_PATH,
  tagTypes: [ACCOUNT_API_TAG],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    registerAccount: registerAccount(builder),
    loginAccount: loginAccount(builder),
    loginWithGoogle: loginWithGoogle(builder),
    getCurrentUserInformation: getCurrentUserInformation(builder)
  }),
})

const { useRegisterAccountMutation, useLoginAccountMutation, useLoginWithGoogleMutation, useGetCurrentUserInformationQuery } = accountApiSlice

export { accountApiSlice, useRegisterAccountMutation, useLoginAccountMutation, useLoginWithGoogleMutation, useGetCurrentUserInformationQuery }



