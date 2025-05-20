import { RequiredFieldError } from '~/app/validation/errors'
import { FieldValidation, ValidationError } from '~/app/validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: FieldValidation.Params): ValidationError | undefined {
    return input[this.field]
      ? undefined
      : new RequiredFieldError({
          name: 'exceptions:REQUIRED_FIELD',
        })
  }
}
