import faker from 'faker'
import { LocalStorageCacheStorage } from './local-storage-cache-storage'
import 'jest-localstorage-mock'

describe('LocalStorageCacheStorage', () => {
  let key: string
  let sut: LocalStorageCacheStorage
  let randomObject: { key: string }

  beforeAll(() => {
    key = faker.random.word()
    randomObject = { key: faker.random.word() }
  })

  beforeEach(() => {
    sut = new LocalStorageCacheStorage()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('get()', () => {
    test('Should call localStorage.getItem with corect value', () => {
      sut.get(key)

      expect(localStorage.getItem).toHaveBeenCalledWith(key)
      expect(localStorage.getItem).toBeCalledTimes(1)
    })

    test('Should return undefined when it has no stored item', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(undefined)

      const response = sut.get(key)

      expect(response).toBeUndefined()
    })

    test('Should return an object on success', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(randomObject))

      const response = sut.get(key)

      expect(response).toEqual(randomObject)
    })
  })

  describe('set()', () => {
    test('Should call localStorage.setItem with corect value', () => {
      sut.set(key, randomObject)

      expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(randomObject))
      expect(localStorage.setItem).toBeCalledTimes(1)
    })

    test('Should call localStorage.removeItem when value does not exist ', () => {
      sut.set(key, undefined)

      expect(localStorage.removeItem).toBeCalledTimes(1)
    })
  })
})
