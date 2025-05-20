/**
=========================================================
* Material Dashboard 2 PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { FC, forwardRef, ReactNode, useMemo } from 'react'
// @mui material components
import { ButtonProps as MDButtonProps } from '@mui/material'
// Material Dashboard 2 PRO React TS contexts
import { useToggleTheme } from '~/app/presentation/hooks'
// Custom styles for MDButton
import MDButtonRoot from './button-styles'

// Declaring props types for MDButton
export interface ButtonProps extends Omit<MDButtonProps, 'color' | 'variant'> {
  color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'default'
  variant?: 'text' | 'contained' | 'outlined' | 'gradient'
  size?: 'small' | 'medium' | 'large'
  circular?: boolean
  iconOnly?: boolean
  children?: ReactNode
  [key: string]: any
}

const MDButton: FC<ButtonProps> = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => {
    const { themeStorage } = useToggleTheme()

    const isDarkMode = useMemo(() => themeStorage.theme === 'dark', [themeStorage.theme])

    return (
      <MDButtonRoot
        {...rest}
        ref={ref}
        ownerState={{ color, variant, size, circular, iconOnly, darkMode: isDarkMode }}
      >
        {children}
      </MDButtonRoot>
    )
  }
)

MDButton.displayName = 'MDButton'

// Declaring default props for MDButton
MDButton.defaultProps = {
  color: 'white',
  variant: 'contained',
  size: 'medium',
  circular: false,
  iconOnly: false,
}

export default MDButton
