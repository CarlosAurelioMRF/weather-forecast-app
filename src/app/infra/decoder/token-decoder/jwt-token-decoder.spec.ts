import faker from 'faker'
import jwtDecode from 'jwt-decode'
import { JWTTokenDecoder } from './jwt-token-decoder'

jest.mock('jwt-decode', () => jest.fn().mockReturnValue({ key: 'any_value' }))

describe('Name of the group', () => {
  let token: string
  let sut: JWTTokenDecoder

  beforeAll(() => {
    token = faker.datatype.uuid()
  })

  beforeEach(() => {
    sut = new JWTTokenDecoder()
  })

  test('Should call jwtDecode with correct value', () => {
    sut.decode<string>(token)

    expect(jwtDecode).toHaveBeenCalledWith(token)
    expect(jwtDecode).toHaveBeenCalledTimes(1)
  })

  test('Should return decoded token', () => {
    const response = sut.decode<string>(token)

    expect(response).toEqual({ key: 'any_value' })
  })
})
