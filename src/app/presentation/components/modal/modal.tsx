import { useCallback } from 'react'
import { Close } from '@mui/icons-material'
import {
  Box,
  Breakpoint,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useTranslation } from '~/app/presentation/hooks'
import { BootstrapDialog, Loading } from './modal-styles'

type Props = {
  open: boolean
  title: string
  maxWidth?: Breakpoint
  fullWidth?: boolean
  loading?: boolean
  saving?: boolean
  disableActions?: boolean
  onClose: () => void
  onSave?: () => void
}

const Modal: React.FC<Props> = ({
  open,
  title,
  children,
  maxWidth,
  fullWidth,
  saving,
  loading,
  disableActions,
  onClose,
  onSave,
}) => {
  const { translate } = useTranslation()

  const renderLoading = useCallback(() => {
    if (!loading) return null

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }, [loading])

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby='customized-dialog-title'
      open={open}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle id='customized-dialog-title' sx={{ m: 0, p: 2 }}>
        {translate(title)}

        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {renderLoading()}

        {!loading && children}
      </DialogContent>
      {!disableActions && (
        <DialogActions>
          <Button type='submit' autoFocus onClick={onSave}>
            {translate('common:actions:save')}

            {saving && <Loading size={16} />}
          </Button>
        </DialogActions>
      )}
    </BootstrapDialog>
  )
}

export default Modal
