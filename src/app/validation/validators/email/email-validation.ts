import { InvalidFieldError } from '~/app/validation/errors'
import { FieldValidation, ValidationError } from '~/app/validation/protocols'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: FieldValidation.Params): ValidationError | undefined {
    const emailRegex =
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !input[this.field] || emailRegex.test(input[this.field])
      ? undefined
      : new InvalidFieldError({
          name: 'exceptions:INVALID_EMAIL',
        })
  }
}
