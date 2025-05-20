import { inject, injectable } from 'inversify'
import { ApiTypes, InfraTypes } from '~/ioc/types'
import { Response } from '~/app/domain/common/types'
import { error, success } from '~/app/domain/common/utils'
import { LoadForecastCoordinates } from '~/app/domain/usecases'
import type { HttpClient } from '~/app/application/protocols/http'
import { RequestResponse } from '~/app/application/protocols/http/request-response'

@injectable()
export class RemoteLoadForecastCoordinates implements LoadForecastCoordinates {
  constructor(
    @inject(ApiTypes.WEATHER.LOAD_FORECAST_COORDINATES)
    private readonly url: string,
    @inject(InfraTypes.HTTP_CLIENT)
    private readonly httpClient: HttpClient<LoadForecastCoordinates.Model>
  ) {}

  async load(
    params: LoadForecastCoordinates.Params
  ): Promise<Response<LoadForecastCoordinates.Model>> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}?latitude=${params.latitude}&longitude=${params.longitude}`,
      headers: {
        'x-user-id': params.userId,
      },
    })

    const forecastOrError = RequestResponse.handle<LoadForecastCoordinates.Model>(httpResponse)

    if (forecastOrError.isError()) {
      return error(forecastOrError.value)
    }

    return success(forecastOrError.value.response as LoadForecastCoordinates.Model)
  }
}
