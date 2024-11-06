
// Libs.
import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { AxiosError, AxiosRequestConfig } from 'axios'
import apiClient from './axiosInstance'


type IAxiosBaseQueryFn = BaseQueryFn<AxiosRequestConfig, unknown, unknown>


const axiosBaseQuery = (): IAxiosBaseQueryFn => async (config) => {
  try {
    // const access_token = getItem('')
    // axiosInstance.defaults.headers['Authorization'] = `Bearer ${access_token}`
    // set(config, 'headers.Authorization', `Bearer ${access_token}`)

    const result = await apiClient(config)
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError as AxiosError
    console.log("------errr-----", err)
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    }
  }
}

export { axiosBaseQuery }
export type { IAxiosBaseQueryFn }
