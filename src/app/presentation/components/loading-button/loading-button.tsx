import { Icon } from '@mui/material'
import { MDBox, MDButton } from '~/app/presentation/components'
import { useToggleTheme } from '~/app/presentation/hooks'
import { ButtonProps } from '../button/button'
import { Loading } from './loading-button-styles'

type Props = ButtonProps & {
  loading: boolean
  title: string
  loadingTitle: string
  icon?: string
  onSubmit?: () => void
}

const LoadingButton: React.FC<Props> = ({
  loading,
  title,
  loadingTitle,
  color,
  icon,
  onSubmit,
  ...props
}) => {
  const {
    themeStorage: { sidenavColor },
  } = useToggleTheme()

  return (
    <MDBox mt={2} display='flex' justifyContent='center'>
      <MDButton
        {...props}
        disabled={loading || props.disabled}
        variant='gradient'
        color={color ?? sidenavColor}
        onClick={onSubmit ?? props.onClick}
      >
        {loading ? (
          <>
            <Loading size={16} />
            {loadingTitle}
          </>
        ) : (
          <>
            <Icon>{icon ?? 'search'}</Icon>
            &nbsp;{title}
          </>
        )}
      </MDButton>
    </MDBox>
  )
}

export default LoadingButton
