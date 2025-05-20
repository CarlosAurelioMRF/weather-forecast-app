import { FormHelperText } from '@mui/material'
import { styled } from '@mui/material/styles'

const HelperText = styled(FormHelperText)(() => ({
  color: '#b94a48',
  margin: 0,
  marginTop: 10,
  '&::before': {
    content: '"* "',
  },
}))

export { HelperText }
