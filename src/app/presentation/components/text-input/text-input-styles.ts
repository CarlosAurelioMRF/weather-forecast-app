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

const CountText = styled(FormHelperText)(() => ({
  color: '#344767',
  margin: 0,
  marginTop: 10,
  textAlign: 'right',
  opacity: 0.7,
}))

export { HelperText, CountText }
