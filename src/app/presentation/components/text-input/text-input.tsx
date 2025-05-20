import { memo, useCallback, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import { TextArea, TextBox } from 'devextreme-react'
import { TextBoxType } from 'devextreme/ui/text_box'
import { ValidationErrorType } from '~/app/presentation/common/protocols'
import { useMaskFormatter, useTranslation } from '~/app/presentation/hooks'
import { CountText, HelperText } from './text-input-styles'

type Props = {
  name: string
  control?: Control<any>
  label: string
  disabled?: boolean
  readOnly?: boolean
  multiline?: boolean
  type?: TextBoxType
  autoComplete?: string
  maxLength?: number
  onChange?: (value: string) => void
  displayLength?: boolean
  mask?: {
    type: 'tel' | 'document'
    mode: 'onChange' | 'onBlur'
  }
}

const TextInput = ({
  name,
  control,
  label,
  disabled,
  readOnly,
  type = 'text',
  mask,
  autoComplete,
  maxLength,
  multiline,
  displayLength,
  onChange,
}: Props) => {
  const { translate } = useTranslation('exceptions')
  const maskFormatter = useMaskFormatter(mask?.type)

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
        const value = useMemo(() => field.value ?? '', [field.value])
        const length = useMemo(() => value.length, [value.length])

        const handleChange = useCallback(
          (value: string) => {
            if (mask?.mode === 'onChange') {
              const formattedValue = maskFormatter?.format(value)
              value = formattedValue ?? value
            }
            field.onChange(value)
            onChange?.(value)
          },
          [maskFormatter]
        )

        const renderComponent = useCallback(() => {
          if (multiline) {
            return (
              <TextArea
                onValueChange={handleChange}
                label={translate(label)}
                height={90}
                inputAttr={{
                  autoComplete,
                  maxLength,
                }}
                {...{ name, value, disabled, readOnly }}
              />
            )
          }

          return (
            <TextBox
              onValueChange={handleChange}
              label={translate(label)}
              height={44}
              mode={type}
              inputAttr={{
                autoComplete,
                maxLength,
              }}
              {...{ name, value, disabled, readOnly }}
            />
          )
        }, [multiline, label, type, name, value, autoComplete, maxLength, disabled, readOnly])

        return (
          <FormControl fullWidth>
            {renderComponent()}

            {invalid && <HelperText>{translate(errorMessage, errorOption)}</HelperText>}

            {displayLength && <CountText>{translate('common:charsLength', { length })}</CountText>}
          </FormControl>
        )
      }}
    />
  )
}

export default memo(TextInput)
