import { inject, injectable } from 'inversify'
import { ApiTypes, InfraTypes } from '~/ioc/types'
import { Response } from '~/app/domain/common/types'
import { error, success } from '~/app/domain/common/utils'
import { LoadForecastCity } from '~/app/domain/usecases'
import type { HttpClient } from '~/app/application/protocols/http'
import { RequestResponse } from '~/app/application/protocols/http/request-response'

@injectable()
export class RemoteLoadForecastCity implements LoadForecastCity {
  constructor(
    @inject(ApiTypes.WEATHER.LOAD_FORECAST_CITY)
    private readonly url: string,
    @inject(InfraTypes.HTTP_CLIENT)
    private readonly httpClient: HttpClient<LoadForecastCity.Model>
  ) {}

  async load(params: LoadForecastCity.Params): Promise<Response<LoadForecastCity.Model>> {
    const httpResponse = await this.httpClient.request({
      method: 'get',
      url: `${this.url}?cityName=${params.cityName}`,
      headers: {
        'x-user-id': params.userId,
      },
    })

    const forecastOrError = RequestResponse.handle<LoadForecastCity.Model>(httpResponse)

    if (forecastOrError.isError()) {
      return error(forecastOrError.value)
    }

    return success(forecastOrError.value.response as LoadForecastCity.Model)
  }
}
