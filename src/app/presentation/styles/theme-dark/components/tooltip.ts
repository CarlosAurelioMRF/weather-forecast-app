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
import Fade from '@mui/material/Fade'
import borders from '~/app/presentation/styles/theme-dark/base/borders'
// Material Dashboard 2 PRO React TS Base Styles
import colors from '~/app/presentation/styles/theme-dark/base/colors'
import typography from '~/app/presentation/styles/theme-dark/base/typography'
// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from '~/app/presentation/styles/theme-dark/functions/pxToRem'

const { black, white } = colors
const { size, fontWeightRegular } = typography
const { borderRadius } = borders

// types
type Types = any

const tooltip: Types = {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },

  styleOverrides: {
    tooltip: {
      maxWidth: pxToRem(200),
      backgroundColor: black.main,
      color: white.main,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      textAlign: 'center',
      borderRadius: borderRadius.md,
      opacity: 0.7,
      padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`,
    },

    arrow: {
      color: black.main,
    },
  },
}

export default tooltip
