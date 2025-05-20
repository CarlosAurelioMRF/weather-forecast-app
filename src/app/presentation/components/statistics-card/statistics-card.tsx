import { ReactNode, useMemo } from 'react'
import { Card, Grid } from '@mui/material'
import { ColorType } from '~/app/presentation/common/types'
import { MDBox, MDTypography } from '~/app/presentation/components'
import { useToggleTheme } from '~/app/presentation/hooks'

// Declaring props types for CompleStatisticsCard
type Props = {
  bgColor?: 'white' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark'
  title?: {
    fontWeight?: 'light' | 'regular' | 'medium' | 'bold'
    text?: string
  }
  count: string | number
  percentage?: {
    color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'white'
    text: string | number
  }
  icon: {
    color: ColorType
    component: ReactNode
  }
  direction?: 'right' | 'left'
  pointer?: boolean
  [key: string]: any
}

const StatisticsCard: React.FC<Props> = ({
  bgColor,
  title,
  count,
  percentage,
  icon,
  direction,
  pointer,
}) => {
  const {
    themeStorage: { theme },
  } = useToggleTheme()

  const darkMode = useMemo(() => theme === 'dark', [theme])

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <MDBox
        bgColor={bgColor}
        pointer={pointer}
        variant='gradient'
        sx={({ palette: { background } }: { palette: any }) => ({
          background: darkMode && background.card,
        })}
      >
        <MDBox p={2}>
          <Grid container alignItems='center'>
            {direction === 'left' ? (
              <Grid item xs={4}>
                <MDBox
                  variant='gradient'
                  bgColor={bgColor === 'white' ? icon.color : 'white'}
                  color={bgColor === 'white' ? 'white' : 'dark'}
                  width='4rem'
                  height='4rem'
                  borderRadius='md'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  shadow='md'
                >
                  {icon.component}
                </MDBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <MDBox
                ml={direction === 'left' ? 2 : 0}
                lineHeight={1}
                textAlign={direction === 'left' ? 'right' : 'left'}
              >
                <MDTypography
                  variant='button'
                  color={bgColor === 'white' ? 'text' : 'white'}
                  opacity={bgColor === 'white' ? 1 : 0.7}
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </MDTypography>
                <MDTypography
                  variant='h5'
                  fontWeight='bold'
                  color={bgColor === 'white' ? 'dark' : 'white'}
                >
                  {count}{' '}
                  <MDTypography variant='button' color={percentage.color} fontWeight='bold'>
                    {percentage.text}
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </Grid>
            {direction === 'right' ? (
              <Grid item xs={4}>
                <MDBox
                  variant='gradient'
                  bgColor={bgColor === 'white' ? icon.color : 'white'}
                  color={bgColor === 'white' ? 'white' : 'dark'}
                  width='4rem'
                  height='4rem'
                  marginLeft='auto'
                  borderRadius='md'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  shadow='md'
                >
                  {icon.component}
                </MDBox>
              </Grid>
            ) : null}
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  )
}

StatisticsCard.defaultProps = {
  bgColor: 'white',
  title: {
    fontWeight: 'light',
    text: '',
  },
  percentage: {
    color: 'success',
    text: '',
  },
  direction: 'right',
}

export default StatisticsCard
