import { memo, useCallback, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import { DateBox } from 'devextreme-react'
import { DateType } from 'devextreme/ui/date_box'
import { ValidationErrorType } from '~/app/presentation/common/protocols'
import { useTranslation } from '~/app/presentation/hooks'
import { HelperText } from './date-input-styles'

type Props = {
  name: string
  control?: Control<any>
  label: string
  disabled?: boolean
  readOnly?: boolean
  format?: string
  type?: DateType
}

const DateInput = ({ name, control, label, disabled, readOnly, type = 'date' }: Props) => {
  const { translate } = useTranslation('exceptions')

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, name, onChange },
        fieldState: { error: controllerError, invalid },
      }) => {
        const errorState = controllerError as unknown as ValidationErrorType

        const errorMessage = useMemo(
          () => errorState?.name ?? errorState?.message ?? '',
          [errorState?.name, errorState?.message]
        )
        const errorOption = useMemo(() => errorState?.option, [errorState?.option])

        const handleChange = useCallback((event: any) => {
          onChange(event.value)
        }, [])

        return (
          <FormControl fullWidth>
            <DateBox
              label={translate(label)}
              onValueChanged={handleChange}
              height={44}
              type
              {...{ name, value, disabled, type, readOnly }}
            />

            {invalid && <HelperText>{translate(errorMessage, errorOption)}</HelperText>}
          </FormControl>
        )
      }}
    />
  )
}

export default memo(DateInput)
