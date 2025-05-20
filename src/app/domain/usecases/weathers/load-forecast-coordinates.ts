import { LoadFunction } from '~/app/domain/common/types'
import { ForecastModel } from '~/app/domain/models'

export interface LoadForecastCoordinates
  extends LoadFunction<LoadForecastCoordinates.Model, LoadForecastCoordinates.Params> {}

export namespace LoadForecastCoordinates {
  export type Params = {
    latitude: number
    longitude: number
  }
  export type Model = ForecastModel
}
