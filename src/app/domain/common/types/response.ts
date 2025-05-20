import {
  AccessDeniedError,
  FormError,
  InvalidCredentialsError,
  UnexpectedError,
} from '~/app/domain/common/exceptions'
import { Either } from '~/app/domain/common/utils'

export type ResponseError =
  | AccessDeniedError
  | InvalidCredentialsError
  | UnexpectedError
  | FormError

export type Response<R = unknown> = Either<ResponseError, R>
