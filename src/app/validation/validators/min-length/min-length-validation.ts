import { InvalidFieldError } from '~/app/validation/errors'
import { FieldValidation, ValidationError } from '~/app/validation/protocols'

export class MinLegthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: FieldValidation.Params): ValidationError | undefined {
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError({
          name: 'exceptions:MIN_LENGTH',
          option: { length: this.minLength },
        })
      : undefined
  }
}
