import { CircularProgress, Dialog } from '@mui/material'
import { styled } from '@mui/material/styles'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const Loading = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.light,
  marginLeft: 10,
}))

export { BootstrapDialog, Loading }
