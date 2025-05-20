import { getDependencies } from '~/ioc/helpers/get-dependencies'
import { ServicesTypes } from '~/ioc/types'
import { apiSlice } from '~/store/features/api/slice/api-slice'
import { queryAdapter } from '~/store/helpers'
import { LoadForecastCity, LoadForecastCoordinates } from '~/app/domain/usecases'
import { setForecast } from '../actions'

const [loadForecastByCityService, loadForecastByCoordinatesService] = getDependencies<
  [LoadForecastCity, LoadForecastCoordinates]
>([ServicesTypes.WEATHER.LOAD_FORECAST_CITY, ServicesTypes.WEATHER.LOAD_FORECAST_COORDINATES])

export const weatherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loadForecastByCity: builder.query<LoadForecastCity.Model, LoadForecastCity.Params>({
      queryFn: async (params) => queryAdapter(loadForecastByCityService.load(params)),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const response = await queryFulfilled

        dispatch(setForecast(response.data))
      },
      providesTags: (result): any =>
        result?.data?.locationName
          ? [{ id: result.data?.locationName, type: 'ForecastData' }]
          : ['PermissionsList'],
    }),
    loadForecastByCoordinates: builder.query<
      LoadForecastCoordinates.Model,
      LoadForecastCoordinates.Params
    >({
      queryFn: async (params) => queryAdapter(loadForecastByCoordinatesService.load(params)),
      onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
        const response = await queryFulfilled

        dispatch(setForecast(response.data))
      },
      providesTags: (result): any =>
        result?.data?.locationName
          ? [{ id: result?.data?.locationName, type: 'ForecastData' }]
          : ['PermissionsList'],
    }),
  }),
})
