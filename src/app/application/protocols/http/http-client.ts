export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

type HttpResponseBody<R> = R & {
  message?: string
}

export interface HttpClient<R = any> {
  token?: string
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<R = any> = {
  statusCode: HttpStatusCode
  body?: HttpResponseBody<R>
}
