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

// @mui material components
import { Theme } from '@mui/material/styles'

function navbar(theme: Theme | any, ownerState: any) {
  const { palette, functions, transitions, breakpoints, borders } = theme
  const { absolute, light } = ownerState

  const { white, text, transparent } = palette
  const { pxToRem } = functions
  const { borderRadius } = borders

  return {
    boxShadow: 'none',
    backdropFilter: 'none',
    backgroundColor: `${transparent.main} !important`,

    color: () => {
      let color

      if (light) {
        color = white.main
      } else {
        color = text.main
      }

      return color
    },
    top: absolute ? 0 : pxToRem(12),
    minHeight: pxToRem(75),
    display: 'grid',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: absolute ? pxToRem(8) : 0,
    paddingLeft: absolute ? pxToRem(16) : 0,

    '& > *': {
      transition: transitions.create('all', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [breakpoints.up('sm')]: {
        minHeight: 'auto',
        padding: `${pxToRem(4)} ${pxToRem(16)}`,
      },
    },
  }
}

const navbarContainer = ({ breakpoints }: Theme, miniScreen: boolean): any => ({
  flexDirection: miniScreen ? 'row' : 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  pt: 0.5,
  pb: 0.5,

  [breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '0',
    paddingBottom: '0',
  },
})

const navbarRow = ({ breakpoints }: Theme, { isMini }: any) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',

  [breakpoints.up('md')]: {
    justifyContent: isMini ? 'space-between' : 'stretch',
    width: isMini ? '100%' : 'max-content',
  },

  [breakpoints.up('xl')]: {
    justifyContent: 'stretch !important',
    width: 'max-content !important',
  },
})

const navbarIconButton = ({ typography: { size }, breakpoints }: Theme) => ({
  px: 1,

  '& .material-icons, .material-icons-round': {
    fontSize: `${size.xl} !important`,
  },

  '& .MuiTypography-root': {
    display: 'none',

    [breakpoints.up('sm')]: {
      display: 'inline-block',
      lineHeight: 1.2,
      ml: 0.5,
    },
  },
})

const navbarDesktopMenu = ({ breakpoints }: Theme) => ({
  display: 'none !important',
  cursor: 'pointer',

  [breakpoints.up('xl')]: {
    display: 'inline-block !important',
  },
})

const navbarMobileMenu = ({ breakpoints }: Theme) => ({
  display: 'inline-block',
  lineHeight: 0,

  [breakpoints.up('xl')]: {
    display: 'none',
  },
})

export { navbar, navbarContainer, navbarRow, navbarIconButton, navbarDesktopMenu, navbarMobileMenu }
