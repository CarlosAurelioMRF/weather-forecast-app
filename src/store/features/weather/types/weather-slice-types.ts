import { LoadForecastCity } from '~/app/domain/usecases'

export const weatherSliceName = 'weatherSlice' as const

export const SET_FORECAST = 'setForecast'

export const WEATHER_SLICE_ACTIONS = {
  SET_FORECAST: `${weatherSliceName}/${SET_FORECAST}`,
} as const

export const WEATHER_SLICE_INITIAL_STATE: WeatherSliceState = {
  forecastResult: null,
}

export type WeatherSliceState = {
  forecastResult: LoadForecastCity.Model
}
