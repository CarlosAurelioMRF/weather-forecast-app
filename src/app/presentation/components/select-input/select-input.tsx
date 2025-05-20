import { memo, useCallback, useMemo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { FormControl } from '@mui/material'
import { SelectBox } from 'devextreme-react'
import DataSource from 'devextreme/data/data_source'
import { ValidationErrorType } from '~/app/presentation/common/protocols'
import { useTranslation } from '~/app/presentation/hooks'
import { HelperText } from './select-input-styles'

type Props = {
  name: string
  control?: Control<any>
  label: string
  dataSource?: any[] | DataSource<any, any>
  disabled?: boolean
  readOnly?: boolean
  grouped?: boolean
  onValueChanged?: (value: string | number) => void
}

const SelectInput = ({
  name,
  control,
  label,
  dataSource,
  disabled,
  readOnly,
  grouped,
  onValueChanged,
}: Props) => {
  const { translate } = useTranslation('exceptions')

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ field, fieldState: { error, invalid } }) => {
        const errorState = error as unknown as ValidationErrorType

        const errorMessage = useMemo(() => errorState?.name ?? '', [errorState?.name])
        const errorOption = useMemo(() => errorState?.option, [errorState?.option])
        const value = useMemo(() => field.value ?? '', [field.value])

        const handleChange = useCallback((value: string) => {
          field.onChange(value)
          onValueChanged?.(value)
        }, [])

        return (
          <FormControl fullWidth>
            <SelectBox
              id='select-input'
              searchEnabled
              onValueChange={handleChange}
              searchExpr='label'
              displayExpr='label'
              valueExpr='id'
              label={translate(label)}
              height={44}
              {...{ name, value, dataSource, disabled, readOnly, grouped }}
            />

            {invalid && <HelperText>{translate(errorMessage, errorOption)}</HelperText>}
          </FormControl>
        )
      }}
    />
  )
}

export default memo(SelectInput)
