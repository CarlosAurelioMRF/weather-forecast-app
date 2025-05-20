import { createAction } from '@reduxjs/toolkit'
import { ActionMap, ReducerMap } from '~/store/types/action-reducer-map'
import { ForecastModel } from '~/app/domain/models'
import { WEATHER_SLICE_ACTIONS, WeatherSliceState } from '../types'

export const setForecast: ActionMap<ForecastModel> = createAction(
  WEATHER_SLICE_ACTIONS.SET_FORECAST
)

export const setForecastReducer: ReducerMap<WeatherSliceState, ForecastModel> = (state, action) => {
  state.forecast = action.payload
}
