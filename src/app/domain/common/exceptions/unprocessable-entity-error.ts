export class UnprocessableEntityError extends Error {
  constructor(message?: string) {
    super('UnprocessableEntity')
    this.name = UnprocessableEntityError.name
    this.message = message ?? 'exceptions:UNPROCESSABLE_ENTITY'
  }
}
