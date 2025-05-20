/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { memo, useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
// @mui material components
import { Divider, IconButton, Switch } from '@mui/material'
import { Theme } from '@mui/material/styles'
// Material Dashboard 2 PRO React context
import { ColorType } from '~/app/presentation/common/types'
// Material Dashboard 2 PRO React TS components
import { MDBox, MDButton, MDTypography } from '~/app/presentation/components'
import { useToggleTheme, useTranslation } from '~/app/presentation/hooks'
// Custom styles for the Configurator
import ConfiguratorRoot from './configurator-styles'

type Props = {
  darkMode: boolean
}

function Configurator({ darkMode }: Props): JSX.Element {
  const { translate } = useTranslation()
  const {
    themeStorage: { openConfigurator, sidenavColor, miniSidenav, transparentSidenav, whiteSidenav },
    handleTheme,
    handleMiniSidenav,
    handleWhiteSidenav,
    handleOpenConfigurator,
    handleTransparentSidenav,
    handleSidenavColor,
  } = useToggleTheme()

  const [disabled, setDisabled] = useState<boolean>(false)
  const sidenavColors: ColorType[] = ['primary', 'dark', 'info', 'success', 'warning', 'error']

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true)
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener('resize', handleDisabled)

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleDisabled)
  }, [])

  const changeTransparentSidenav = () => {
    handleWhiteSidenav(false)
    handleTransparentSidenav(true)
  }
  const handleDarkSidenav = () => {
    handleWhiteSidenav(false)
    handleTransparentSidenav(false)
  }
  const changeMiniSidenav = () => handleMiniSidenav(!miniSidenav)
  const handleDarkMode = () => handleTheme(darkMode ? 'light' : 'dark')
  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }: Theme | any) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    '&:hover, &:focus, &:focus:not(:hover)': {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  })

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }: Theme | any) => ({
    height: pxToRem(39),
    background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    '&:hover, &:focus, &:focus:not(:hover)': {
      background: darkMode ? white.main : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  })

  return (
    <ConfiguratorRoot variant='permanent' ownerState={{ openConfigurator }}>
      <MDBox
        display='flex'
        justifyContent='space-between'
        alignItems='baseline'
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant='h5'>{translate('common:settings:title')}</MDTypography>
          <MDTypography variant='body2' color='text'>
            {translate('common:settings:subtitle')}
          </MDTypography>
        </MDBox>

        <Close
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: 'currentColor',
            strokeWidth: '2px',
            cursor: 'pointer',
            transform: 'translateY(5px)',
          })}
          onClick={() => handleOpenConfigurator(false)}
        />
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant='h6'>{translate('common:settings:colorTitle')}</MDTypography>

          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }: Theme | any) => ({
                  width: '24px',
                  height: '24px',
                  padding: 0,
                  border: `${borderWidth[1]} solid ${darkMode ? background.sidenav : white.main}`,
                  borderColor: () => {
                    let borderColorValue = sidenavColor === color && dark.main

                    if (darkMode && sidenavColor === color) {
                      borderColorValue = white.main
                    }

                    return borderColorValue
                  },
                  transition: transitions.create('border-color', {
                    easing: transitions.easing.sharp,
                    duration: transitions.duration.shorter,
                  }),
                  backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                    linearGradient(gradients[color].main, gradients[color].state),

                  '&:not(:last-child)': {
                    mr: 1,
                  },

                  '&:hover, &:focus, &:active': {
                    borderColor: darkMode ? white.main : dark.main,
                  },
                })}
                onClick={() => handleSidenavColor(color)}
              />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant='h6'>{translate('common:settings:sidenavType')}</MDTypography>

          <MDBox
            sx={{
              display: 'flex',
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color='dark'
              variant='gradient'
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              {translate('common:settings:dark')}
            </MDButton>
            <MDBox sx={{ mx: 1, width: '8rem', minWidth: '8rem' }}>
              <MDButton
                color='dark'
                variant='gradient'
                onClick={changeTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }
              >
                {translate('common:settings:transparent')}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant='h6'>{translate('common:settings:sidenavMini')}</MDTypography>

          <Switch checked={miniSidenav} onChange={changeMiniSidenav} />
        </MDBox>
        <Divider />
        <MDBox display='flex' justifyContent='space-between' alignItems='center' lineHeight={1}>
          <MDTypography variant='h6'>{translate('common:settings:lightDark')}</MDTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
      </MDBox>
    </ConfiguratorRoot>
  )
}

export default memo(Configurator)
