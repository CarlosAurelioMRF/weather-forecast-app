import { Response } from './response'

export interface DeleteFunction<T> {
  delete: (id: string) => Promise<Response<T>>
}
