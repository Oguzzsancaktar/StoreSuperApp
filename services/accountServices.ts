import IRegisterDTO from '@/interfaces/account/IRegisterDTO';
import { axiosBaseQuery, IAxiosBaseQueryFn } from '../config/axiosBaseQuery';
import { createApi, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import ILoginDTO from '@/interfaces/account/ILoginDTO';
import ILoginResult from '@/interfaces/account/ILoginResult';
import IUser from '@/interfaces/account/IUser';
import IPassordUpdateDTO from '@/interfaces/account/IPassordUpdateDTO';
import IAppleCredentials from '@/interfaces/account/IAppleCredentials';
import { baseApi, ACCOUNT_API_TAG, LISTING_API_TAG } from './apiTags';

const ACCOUNT_API_REDUCER_PATH = 'accountAPI';

type TagTypes = typeof ACCOUNT_API_TAG | typeof LISTING_API_TAG;

type ApiTagTypes = typeof LISTING_API_TAG | typeof ACCOUNT_API_TAG;

type IBuilder = EndpointBuilder<
  IAxiosBaseQueryFn,
  ApiTagTypes,
  typeof baseApi.reducerPath
>;

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
      console.log("data", data)
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

const loginWithApple = (builder: IBuilder) => {
  return builder.mutation<ILoginResult, IAppleCredentials>({
    query(data) {
      return {
        url: `/account/login/apple`,
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

const updateUserContactPrefferences = (builder: IBuilder) => {
  return builder.mutation<any, {
    showEmailOnProfile: boolean,
    showPhoneNumberOnProfile: boolean
  }>({
    query(data) {
      return {
        url: `/users/updateProfileSettingsPreferences`,
        method: 'POST',
        data
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}


const blockUser = (builder: IBuilder) => {
  return builder.mutation<ILoginResult, string>({
    query(blockedUserId) {
      return {
        url: `/block/block-user`,
        method: 'POST',
        data: {
          blockedUserId
        }
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}

const unblockUser = (builder: IBuilder) => {
  return builder.mutation<ILoginResult, string>({
    query(blockedUserId) {
      return {
        url: `/block/unblock-user`,
        method: 'DELETE',
        data: {
          blockedUserId
        }
      }
    },
    invalidatesTags: [ACCOUNT_API_TAG],
  })
}

const getBlockedUsers = (builder: IBuilder) => {
  return builder.query<IUser[], void>({
    query() {
      return {
        url: `/block/blocked-users`,
        method: 'GET',
      }
    },
    providesTags: [ACCOUNT_API_TAG],
  })
}

const getUserProfile = (builder: IBuilder) => {
  return builder.query<IUser, string>({
    query(id) {
      return {
        url: `/users/${id}/profile`,
        method: 'GET',
      }
    },
    providesTags: [ACCOUNT_API_TAG],
  })
}

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
    providesTags: [ACCOUNT_API_TAG, LISTING_API_TAG],
  })
}

const accountApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUserContactPrefferences: updateUserContactPrefferences(builder),
    unblockUser: unblockUser(builder),
    getBlockedUsers: getBlockedUsers(builder),
    blockUser: blockUser(builder),
    getUserProfile: getUserProfile(builder),
    updatePassword: updatePassword(builder),
    registerAccount: registerAccount(builder),
    loginAccount: loginAccount(builder),
    loginWithGoogle: loginWithGoogle(builder),
    loginWithApple: loginWithApple(builder),
    getCurrentUserInformation: getCurrentUserInformation(builder),
    getCurrentUserListings: getCurrentUserListings(builder),
    addCurrentUserImage: addCurrentUserImage(builder),
    deleteUser: deleteUser(builder),
    putUpdateUserInformations: putUpdateUserInformations(builder)
  }),
  overrideExisting: false,
});

const {
  useUpdateUserContactPrefferencesMutation,
  useUnblockUserMutation,
  useGetBlockedUsersQuery,
  useBlockUserMutation,
  useGetUserProfileQuery,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useRegisterAccountMutation,
  useLoginAccountMutation,
  useLoginWithAppleMutation,
  useLoginWithGoogleMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
  useAddCurrentUserImageMutation,
  usePutUpdateUserInformationsMutation,
} = accountApiSlice

export {
  accountApiSlice,
  useUnblockUserMutation,
  useGetBlockedUsersQuery,
  useBlockUserMutation,
  useGetUserProfileQuery,
  useDeleteUserMutation,
  useUpdatePasswordMutation,
  useLoginWithAppleMutation,
  useRegisterAccountMutation,
  useLoginAccountMutation,
  useLoginWithGoogleMutation,
  useGetCurrentUserInformationQuery,
  useGetCurrentUserListingsQuery,
  useAddCurrentUserImageMutation,
  usePutUpdateUserInformationsMutation,
  useUpdateUserContactPrefferencesMutation
}



