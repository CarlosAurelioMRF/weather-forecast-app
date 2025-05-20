import { ContainerModule } from 'inversify'
import { ServicesTypes } from '~/ioc/types'
import { LoadForecastCity, LoadForecastCoordinates } from '~/app/domain/usecases'
import { RemoteLoadForecastCity, RemoteLoadForecastCoordinates } from '~/app/application/services'

export const WeathersModule = new ContainerModule((bind) => {
  bind<LoadForecastCity>(ServicesTypes.WEATHER.LOAD_FORECAST_CITY).to(RemoteLoadForecastCity)
  bind<LoadForecastCoordinates>(ServicesTypes.WEATHER.LOAD_FORECAST_COORDINATES).to(
    RemoteLoadForecastCoordinates
  )
})
