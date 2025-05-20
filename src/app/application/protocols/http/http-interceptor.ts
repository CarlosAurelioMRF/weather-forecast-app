export interface HttpInterceptor {
  intercept: (callback?: HttpInterceptor.Params) => () => void
}

export namespace HttpInterceptor {
  export type Params = {
    onSuccess?: (token: string) => void
    onError?: (error: unknown) => void
  }
}
