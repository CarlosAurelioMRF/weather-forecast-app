import { InvalidFieldError } from '~/app/validation/errors'
import { FieldValidation, ValidationError } from '~/app/validation/protocols'

export class URLValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: FieldValidation.Params): ValidationError | undefined {
    const urlRegex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/
    return !input[this.field] || urlRegex.test(input[this.field])
      ? undefined
      : new InvalidFieldError({
          name: 'exceptions:INVALID_URL',
        })
  }
}
