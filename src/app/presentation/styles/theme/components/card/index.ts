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
import borders from '~/app/presentation/styles/theme/base/borders'
import boxShadows from '~/app/presentation/styles/theme/base/boxShadows'
import colors from '~/app/presentation/styles/theme/base/colors'
// Material Dashboard 2 PRO React Helper Function
import rgba from '~/app/presentation/styles/theme/functions/rgba'

const { black, white } = colors
const { borderWidth, borderRadius } = borders
const { md } = boxShadows

// types
// types
type Types = any

const card: Types = {
  styleOverrides: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minWidth: 0,
      wordWrap: 'break-word',
      backgroundColor: white.main,
      backgroundClip: 'border-box',
      border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: 'visible',
    },
  },
}

export default card
