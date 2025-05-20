import { FC, forwardRef, memo } from 'react'
import { BoxProps } from '@mui/material'
import BoxRoot from './box-styles'

type Props = BoxProps & {
  variant?: 'contained' | 'gradient'
  bgColor?: string
  color?: string
  opacity?: number
  borderRadius?: string
  shadow?: string
  coloredShadow?: string
  pointer?: boolean
  [key: string]: any
}

const MDBox: FC<Props> = forwardRef(
  (
    { variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow, pointer, ...rest },
    ref
  ) => (
    <BoxRoot
      {...rest}
      ref={ref}
      ownerState={{
        variant,
        bgColor,
        color,
        opacity,
        borderRadius,
        shadow,
        coloredShadow,
        pointer,
      }}
    />
  )
)

MDBox.displayName = 'MDBox'

MDBox.defaultProps = {
  variant: 'contained',
  bgColor: 'transparent',
  color: 'dark',
  opacity: 1,
  borderRadius: 'none',
  shadow: 'none',
  coloredShadow: 'none',
}

export default memo(MDBox)
