import { createApi } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: null,
  reducerPath: 'api',
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 15,
  tagTypes: ['ForecastData'],
})
