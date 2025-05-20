import { RequiredFieldError } from '~/app/validation/errors'
import { FieldValidation, ValidationError } from '~/app/validation/protocols'

export class RequiredConditionllyFieldValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldA: string,
    private readonly fieldB: string
  ) {}

  validate(input: FieldValidation.Params): ValidationError | undefined {
    return !input[this.field] && (input[this.fieldA] || input[this.fieldB])
      ? new RequiredFieldError({
          name: 'exceptions:REQUIRED_FIELD',
        })
      : undefined
  }
}
