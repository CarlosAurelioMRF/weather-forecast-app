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

// Material Dashboard 2 PRO React TS Base Styles
import borders from '~/app/presentation/styles/theme-dark/base/borders'
import colors from '~/app/presentation/styles/theme-dark/base/colors'
import typography from '~/app/presentation/styles/theme-dark/base/typography'
// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from '~/app/presentation/styles/theme-dark/functions/pxToRem'
import rgba from '~/app/presentation/styles/theme-dark/functions/rgba'

const { size } = typography
const { white } = colors
const { borderWidth, borderColor } = borders

// types
type Types = any

const dialogContent: Types = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: rgba(white.main, 0.8),
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
      borderBottom: `${borderWidth[1]} solid ${rgba(borderColor, 0.6)}`,
    },
  },
}

export default dialogContent
