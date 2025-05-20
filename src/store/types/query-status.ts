export enum QueryStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type QueryManagement<T> = {
  data: T extends void ? null : T
  status: QueryStatus
  error: string
  preventLoading: boolean
}
