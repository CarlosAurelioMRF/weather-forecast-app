import { InvalidFieldError } from '~/app/validation/errors'
import { FieldValidation, ValidationError } from '~/app/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly fieldToCompare: string) {}

  validate(input: FieldValidation.Params): ValidationError | undefined {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError({
          name: 'exceptions:MISMATCH_FIELD',
        })
      : undefined
  }
}
