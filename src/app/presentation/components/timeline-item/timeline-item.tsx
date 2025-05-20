import { useMemo } from 'react'
import { Icon } from '@mui/material'
import { MDBox, MDTypography } from '~/app/presentation/components'
import { useToggleTheme } from '~/app/presentation/hooks'
import timelineItem from './timeline-item-styles'

type Props = {
  color: string
  icon: string
  title: string
  dateTime: string
  lastItem?: boolean
}

const TimelineItem: React.FC<Props> = ({ color, icon, title, dateTime, lastItem }) => {
  const { themeStorage } = useToggleTheme()

  const isDark = useMemo(() => themeStorage.theme === 'dark', [themeStorage.theme])

  return (
    <MDBox
      position='relative'
      mb={3}
      sx={(theme: any) => timelineItem(theme, { lastItem, isDark })}
    >
      <MDBox
        display='flex'
        justifyContent='center'
        alignItems='center'
        bgColor={color}
        color='white'
        width='2rem'
        height='2rem'
        borderRadius='50%'
        position='absolute'
        top='8%'
        left='2px'
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }: any) => size.sm }}
      >
        <Icon fontSize='inherit'>{icon}</Icon>
      </MDBox>
      <MDBox sx={{ marginLeft: 6 }} pt={0.5} lineHeight={0} maxWidth='30rem'>
        <MDTypography variant='button' fontWeight='medium' color={isDark ? 'white' : 'dark'}>
          {title}
        </MDTypography>
        <MDBox mt={0.5}>
          <MDTypography variant='caption' color={isDark ? 'secondary' : 'text'}>
            {dateTime}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  )
}

export default TimelineItem
