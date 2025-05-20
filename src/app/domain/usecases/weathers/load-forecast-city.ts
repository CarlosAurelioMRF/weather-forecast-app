import { LoadFunction } from '~/app/domain/common/types'
import { ForecastModel } from '~/app/domain/models'

export interface LoadForecastCity
  extends LoadFunction<LoadForecastCity.Model, LoadForecastCity.Params> {}

export namespace LoadForecastCity {
  export type Params = { userId: string; cityName: string }
  export type Model = {
    success: boolean
    message?: string
    data?: ForecastModel
  }
}
