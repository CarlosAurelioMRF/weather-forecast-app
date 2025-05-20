import {
  AccessDeniedError,
  FormError,
  InvalidCredentialsError,
  UnexpectedError,
} from '~/app/domain/common/exceptions'
import { Response, ResponseError } from '~/app/domain/common/types'
import { CombinedPredicated, combinedPredicates, error, success } from '~/app/domain/common/utils'
import { HttpResponse, HttpStatusCode } from '~/app/application/protocols/http'

export class RequestResponse<R> {
  private constructor(private readonly _response: R) {
    Object.freeze(this)
  }

  public static handle<R>(httpResponse: HttpResponse<R>): Response<RequestResponse<R>> {
    const { statusCode } = httpResponse

    if (this.isSuccess(statusCode)) {
      return success(new RequestResponse(httpResponse.body))
    }

    const predicates: CombinedPredicated<HttpStatusCode, ResponseError> = [
      [this.isForbidden, new AccessDeniedError()],
      [this.isUnauthorized, new InvalidCredentialsError()],
      [this.isBadRequest, new UnexpectedError(httpResponse.body?.message)],
      [this.isNotFound, new FormError(httpResponse?.body?.message)],
    ]

    const errors = combinedPredicates({
      value: statusCode,
      predicatePairs: predicates,
    })

    if (errors.isError()) {
      return error(errors.value)
    }

    return error(new UnexpectedError())
  }

  private static isSuccess(statusCode: HttpStatusCode): boolean {
    return statusCode >= 200 && statusCode <= 299
  }

  private static isForbidden(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.forbidden
  }

  private static isUnauthorized(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.unauthorized
  }

  private static isBadRequest(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.badRequest
  }

  private static isNotFound(statusCode: HttpStatusCode): boolean {
    return statusCode === HttpStatusCode.notFound
  }

  get response(): R {
    return this._response
  }
}
