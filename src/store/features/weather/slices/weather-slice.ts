import { SliceCaseReducers } from '@reduxjs/toolkit'
import { setForecastReducer } from '~/store/features/weather/actions'
import {
  SET_FORECAST,
  WEATHER_SLICE_INITIAL_STATE,
  weatherSliceName,
  WeatherSliceState,
} from '~/store/features/weather/types'
import { createHydratedSlice } from '~/store/helpers'

export const weatherSlice = createHydratedSlice<
  WeatherSliceState,
  SliceCaseReducers<WeatherSliceState>,
  typeof weatherSliceName
>({
  name: weatherSliceName,
  initialState: { ...WEATHER_SLICE_INITIAL_STATE },
  reducers: {
    [SET_FORECAST]: setForecastReducer,
  },
})
