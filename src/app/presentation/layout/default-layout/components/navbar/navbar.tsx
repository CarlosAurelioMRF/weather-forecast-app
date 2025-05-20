import { useCallback, useMemo, useState } from 'react'
import { Check, List, Menu as MenuIcon, MenuOpen, Settings } from '@mui/icons-material'
import { AppBar, IconButton, Menu, Theme, Toolbar, useMediaQuery } from '@mui/material'
import { RouteType } from '~/app/presentation/common/types'
import { MDBox, MDSnackbar, NotificationItem } from '~/app/presentation/components'
import { useToggleTheme, useTranslation } from '~/app/presentation/hooks'
import { Breadcrumbs } from './components'
import {
  navbar,
  navbarContainer,
  navbarDesktopMenu,
  navbarIconButton,
  navbarMobileMenu,
  navbarRow,
} from './navbar-styles'

type Props = {
  routesMenu: RouteType[]
  absolute?: boolean
  light?: boolean
  isMini?: boolean
}

const Navbar: React.FC<Props> = ({ routesMenu, absolute, light, isMini }) => {
  const { translate } = useTranslation()
  const { toggleMiniSidenav, handleOpenConfigurator, themeStorage } = useToggleTheme()
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [openSettings, setOpenSettings] = useState<any>(false)
  const [openSuccess, setOpenSuccess] = useState<string>()

  const isDarkMode = useMemo(() => themeStorage.theme === 'dark', [themeStorage.theme])

  const iconsStyle = useMemo(
    () =>
      ({
        palette: { dark, white, text },
        functions: { rgba },
      }: {
        palette: any
        functions: any
      }) => ({
        color: () => {
          let colorValue = light || isDarkMode ? white.main : dark.main

          if (!light) {
            colorValue = isDarkMode ? rgba(text.main, 0.6) : text.main
          }

          return colorValue
        },
      }),
    [light, isDarkMode]
  )

  const handleOpenSettings = (event: any) => setOpenSettings(event.currentTarget)

  const handleCloseSettings = () => setOpenSettings(false)

  const handleSettings = () => {
    handleOpenConfigurator(true)
    handleCloseSettings()
  }

  const closeSuccess = () => setOpenSuccess(null)

  const renderSettings = useCallback(
    () => (
      <Menu
        anchorEl={openSettings}
        anchorReference={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={Boolean(openSettings)}
        onClose={handleCloseSettings}
        sx={{ mt: 2 }}
      >
        <NotificationItem
          icon={<Settings />}
          title={translate('common:actions:settings')}
          onClick={handleSettings}
        />
      </Menu>
    ),
    [openSettings]
  )

  const renderSuccess = (
    <MDSnackbar
      color='success'
      icon={<Check />}
      title={translate('applicationName')}
      content={translate(openSuccess)}
      open={!!openSuccess}
      close={closeSuccess}
      onClose={closeSuccess}
      bgWhite
    />
  )

  return (
    <AppBar
      position={absolute ? 'absolute' : 'static'}
      color='inherit'
      sx={(theme) => navbar(theme, { absolute, light, darkMode: isDarkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, hidden)}>
        <MDBox color='inherit' mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs routesMenu={routesMenu} light={light} />
          <IconButton sx={navbarDesktopMenu} onClick={toggleMiniSidenav} size='small' disableRipple>
            {themeStorage.miniSidenav ? (
              <MenuOpen sx={iconsStyle} fontSize='medium' />
            ) : (
              <MenuIcon sx={iconsStyle} fontSize='medium' />
            )}
          </IconButton>
        </MDBox>
        {!isMini && (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? 'white' : 'inherit'}>
              <IconButton
                size='small'
                disableRipple
                color='inherit'
                sx={navbarMobileMenu}
                onClick={toggleMiniSidenav}
              >
                {themeStorage.miniSidenav ? (
                  <MenuOpen sx={iconsStyle} fontSize='medium' />
                ) : (
                  <MenuIcon sx={iconsStyle} fontSize='medium' />
                )}
              </IconButton>

              <MDBox
                display='flex'
                justifyContent={hidden ? 'flex-end' : 'center'}
                alignItems='center'
              >
                <IconButton
                  size='small'
                  disableRipple
                  color='inherit'
                  sx={navbarIconButton}
                  onClick={handleOpenSettings}
                >
                  <List sx={iconsStyle} />
                </IconButton>
              </MDBox>
              {renderSettings()}
            </MDBox>
          </MDBox>
        )}

        {renderSuccess}
      </Toolbar>
    </AppBar>
  )
}

Navbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
}

export default Navbar
