import { DefaultBodyType, MockedRequest, rest, RestHandler } from 'msw'
import { setupServer } from 'msw/node'
import { makeApiUrl } from '~/ioc/helpers'
import { HttpMethod, HttpStatusCode } from '~/app/application/protocols/http'

export const createHandler = ({
  method,
  statusCode,
  body,
  path,
  delayInMs = 0,
}: {
  method: HttpMethod
  body: any
  statusCode: HttpStatusCode
  path: string
  delayInMs?: number
}) => {
  return rest[method](makeApiUrl(path), (req, res, ctx) => {
    return res(ctx.delay(delayInMs), ctx.status(statusCode), ctx.json(body))
  })
}

export const mockMswServer = (handler: RestHandler<MockedRequest<DefaultBodyType>>) => {
  return setupServer(handler)
}
