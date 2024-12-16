
import IRegisterDTO from '@/interfaces/account/IRegisterDTO';
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';

import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react'
import ILoginDTO from '@/interfaces/account/ILoginDTO';
import ILoginResult from '@/interfaces/account/ILoginResult';
import IUser from '@/interfaces/account/IUser';
import IPassordUpdateDTO from '@/interfaces/account/IPassordUpdateDTO';


const ACCOUNT_API_REDUCER_PATH = 'accountAPI'
export const ACCOUNT_API_TAG = "accountTag"

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  typeof ACCOUNT_API_TAG,
  typeof ACCOUNT_API_REDUCER_PATH
>


const updatePassword = (builder: IBuilder) => {
  return builder.mutation<string[], IPassordUpdateDTO>({
    query(data) {
      return {
        url: `/account/change-password`,
        method: 'POST',
        data
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}



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
const deleteUser = (builder: IBuilder) => {
  return builder.mutation<any, string>({
    query(id) {
      return {
        url: `/users`,
        method: 'DELETE',
        data: {
          userId: id
        }
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


const putUpdateUserInformations = (builder: IBuilder) => {
  return builder.mutation<IUser, Pick<IUser, "id" | "firstName" | "language" | "lastName" | "email" | "phoneNumber">>({
    query(data) {
      return {
        url: `/users`,
        method: 'PUT',
        data
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


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


const addCurrentUserImage = (builder: IBuilder) => {
  return builder.mutation<IUser, void>({
    query(data) {
      return {
        url: `/users/profile/add-image`,
        method: 'POST',
        data
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


const getCurrentUserListings = (builder: IBuilder) => {
  return builder.query<any[], void>({
    query() {
      return {
        url: `/users/my-listings`,
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
    updatePassword: updatePassword(builder),
    registerAccount: registerAccount(builder),
    loginAccount: loginAccount(builder),
    loginWithGoogle: loginWithGoogle(builder),
    getCurrentUserInformation: getCurrentUserInformation(builder),
    getCurrentUserListings: getCurrentUserListings(builder),
    addCurrentUserImage: addCurrentUserImage(builder),
    deleteUser: deleteUser(builder),
    putUpdateUserInformations: putUpdateUserInformations(builder)
  }),
})

const {
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useRegisterAccountMutation,
  useLoginAccountMutation,
  useLoginWithGoogleMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
  useAddCurrentUserImageMutation,
  usePutUpdateUserInformationsMutation } = accountApiSlice

export {
  accountApiSlice,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useRegisterAccountMutation,
  useLoginAccountMutation,
  useLoginWithGoogleMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
  useAddCurrentUserImageMutation,
  usePutUpdateUserInformationsMutation
}



