import { memo, useCallback, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import { NumberBox } from 'devextreme-react'
import { ValidationErrorType } from '~/app/presentation/common/protocols'
import { useTranslation } from '~/app/presentation/hooks'
import { HelperText } from './number-input-styles'

type Props = {
  name: string
  control?: Control<any>
  label: string
  disabled?: boolean
  format?: string
  min?: number
  max?: number
  readOnly?: boolean
  onChange?: (value: number) => void
}

const NumberInput = ({ name, control, label, onChange, ...inputProps }: Props) => {
  const { translate } = useTranslation('exceptions')

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error: controllerError, invalid } }) => {
        const errorState = controllerError as unknown as ValidationErrorType

        const errorMessage = useMemo(
          () => errorState?.name ?? errorState?.message ?? '',
          [errorState?.name, errorState?.message]
        )
        const errorOption = useMemo(() => errorState?.option, [errorState?.option])
        const value = useMemo(() => field.value, [field.value])

        const handleChange = useCallback((value: number) => {
          field.onChange(value)
          onChange?.(value)
        }, [])

        return (
          <FormControl fullWidth>
            <NumberBox
              onValueChange={handleChange}
              label={translate(label)}
              height={44}
              {...{ name, value, ...inputProps }}
            />

            {invalid && <HelperText>{translate(errorMessage, errorOption)}</HelperText>}
          </FormControl>
        )
      }}
    />
  )
}

export default memo(NumberInput)
