import { memo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { Box, Switch as SwitchMaterialUi, SwitchProps } from '@mui/material'
import { MDTypography } from '~/app/presentation/components'
import { useTranslation } from '~/app/presentation/hooks'

type Props = Omit<SwitchProps, 'defaultChecked'> & {
  label?: string
  name?: string
  control?: Control<any>
  defaultChecked?: boolean
}

const SwitchInput = ({ checked, label, name, defaultChecked, ...props }: Props) => {
  const { translate } = useTranslation()

  return (
    <Controller
      {...props}
      name={name}
      defaultValue={true}
      render={({ field }) => (
        <Box display='flex' alignItems='center'>
          <SwitchMaterialUi
            {...field}
            color='primary'
            checked={checked}
            defaultChecked={defaultChecked}
          />
          <MDTypography fontWeight='regular' color='text' variant='h6' component='span'>
            {translate(label)}
          </MDTypography>
        </Box>
      )}
    />
  )
}

export default memo(SwitchInput)
