import faker from 'faker'
import * as Helper from '../utils/http-mocks'

export const mockInvalidCredentialsError = (): void => Helper.mockUnauthorizedError(/signin/)

export const mockAccessDeniedError = (): void => Helper.mockAccessDeniedError('POST', /signin/)

export const mockUnexpectedError = (): void => Helper.mockUnexpectedError('POST', /signin/)

export const mockOk = (): void =>
  Helper.mockOk(/signin/, 'POST', {
    provider: faker.random.arrayElement(['Google', 'Email', 'Facebook']),
    accessToken: faker.random.uuid(),
    expiresIn: faker.random.number(),
    refreshToken: faker.random.uuid(),
    refreshTokenExpiresIn: faker.random.number(),
  })
