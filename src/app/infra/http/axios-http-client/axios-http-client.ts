import axios, { AxiosResponse } from 'axios'
import { injectable } from 'inversify'
import { HttpClient, HttpRequest, HttpResponse } from '~/app/application/protocols/http'

@injectable()
export class AxiosHttpClient implements HttpClient {
  async request({ method, url, body, headers }: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url,
        data: body,
        headers,
        method,
      })
    } catch (error) {
      axiosResponse = error.response
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
    }
  }
}
