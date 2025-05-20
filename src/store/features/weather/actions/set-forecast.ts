import { createAction } from '@reduxjs/toolkit'
import { ActionMap, ReducerMap } from '~/store/types/action-reducer-map'
import { LoadForecastCity } from '~/app/domain/usecases'
import { WEATHER_SLICE_ACTIONS, WeatherSliceState } from '../types'

export const setForecast: ActionMap<LoadForecastCity.Model> = createAction(
  WEATHER_SLICE_ACTIONS.SET_FORECAST
)

export const setForecastReducer: ReducerMap<WeatherSliceState, LoadForecastCity.Model> = (
  state,
  action
) => {
  state.forecastResult = action.payload
}
