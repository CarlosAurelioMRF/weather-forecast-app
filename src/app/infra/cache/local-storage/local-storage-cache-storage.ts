import { injectable } from 'inversify'
import { CacheStorage } from '~/app/application/protocols/cache'

@injectable()
export class LocalStorageCacheStorage implements CacheStorage {
  get<T>(key: string): T | undefined {
    const storedItem = localStorage.getItem(key)

    if (!storedItem) return undefined

    return JSON.parse(storedItem)
  }

  set<T>(key: string, value: T): void {
    value ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.removeItem(key)
  }
}
