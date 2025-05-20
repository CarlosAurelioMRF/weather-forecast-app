import { useEffect } from 'react'
import { DefaultValues, FieldValues, Resolver, useForm as useFormRHF } from 'react-hook-form'
import { Validation } from '../common/protocols'
import { useValidationResolver } from './use-validation-resolver'

export type UseFormParams<T> = {
  validationSchema?: Validation
  mode?: 'all' | 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched'
  defaultValues?: DefaultValues<T>
}

export const useForm = <T extends FieldValues>({
  defaultValues,
  mode,
  validationSchema,
}: UseFormParams<T> = {}) => {
  const resolver = useValidationResolver(validationSchema) as unknown as Resolver<T, object>

  const methods = useFormRHF<T>({
    resolver,
    mode,
    defaultValues,
  })

  useEffect(() => {
    methods.reset(defaultValues)
  }, [defaultValues])

  return methods
}
