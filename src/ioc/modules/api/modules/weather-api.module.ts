import { ContainerModule } from 'inversify'
import { makeApiUrl } from '~/ioc/helpers'
import { ApiTypes } from '~/ioc/types'

export const WeatherApiModule = new ContainerModule((bind) => {
  bind<string>(ApiTypes.WEATHER.LOAD_FORECAST_CITY).toDynamicValue(() =>
    makeApiUrl('weathers/forecast-by-city')
  )
  bind<string>(ApiTypes.WEATHER.LOAD_FORECAST_COORDINATES).toDynamicValue(() =>
    makeApiUrl('weathers/forecast-by-coordinates')
  )
})
