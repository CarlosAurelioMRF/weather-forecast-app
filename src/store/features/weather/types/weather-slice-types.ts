import { ForecastModel } from '~/app/domain/models'

export const weatherSliceName = 'weatherSlice' as const

export const SET_FORECAST = 'setForecast'

export const WEATHER_SLICE_ACTIONS = {
  SET_FORECAST: `${weatherSliceName}/${SET_FORECAST}`,
} as const

export const WEATHER_SLICE_INITIAL_STATE: WeatherSliceState = {
  forecast: null,
}

export type WeatherSliceState = {
  forecast: ForecastModel
}
