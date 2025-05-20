export const InfraTypes = {
  HTTP_CLIENT: Symbol('HttpClient'),
  AUTHORIZE_HTTP_CLIENT: Symbol('AuthorizeHttpClient'),
  TOKEN_DECODER: Symbol('TokenDecoder'),
  CACHE_STORAGE: Symbol('CacheStorage'),
  REFRESH_TOKEN_INTERCEPTOR: Symbol('RefreshTokenInterceptor'),
  FORMATTERS: {
    TEL_MASK_FORMATTER: Symbol('TelMaskFormatter'),
    DOCUMENT_MASK_FORMATTER: Symbol('DocumentMaskFormatter'),
  },
}
