import { ReactNode, useCallback, useMemo } from 'react'
import { Card, Grid, Icon } from '@mui/material'
import { getWeathertate } from '~/store/features/weather'
import { MDBox, MDTypography } from '~/app/presentation/components'
import {
  useAppSelector,
  useDateHelper,
  useStringHelper,
  useTranslation,
} from '~/app/presentation/hooks'

const CurrentWeather = () => {
  const { translate } = useTranslation('weathers')
  const { forecastResult } = useAppSelector(getWeathertate)
  const { formatDate } = useDateHelper()
  const { formatPercent } = useStringHelper()

  const forecast = useMemo(() => forecastResult?.data, [forecastResult?.data])

  const renderInfoCard = useCallback(
    (title: string, description: string, icon: string | ReactNode) => (
      <Card>
        <MDBox p={3}>
          {typeof icon === 'string' ? (
            <MDBox
              display='grid'
              justifyContent='center'
              alignItems='center'
              bgColor='secondary'
              color='white'
              width='3rem'
              height='3rem'
              shadow='md'
              borderRadius='lg'
              variant='gradient'
            >
              <Icon>{icon}</Icon>
            </MDBox>
          ) : (
            icon
          )}
          <MDBox mt={2.625}>
            <MDTypography variant='h5' fontWeight='medium' textTransform='capitalize'>
              {title}
            </MDTypography>
            <MDTypography variant='body2' color='text' fontWeight='regular'>
              {description}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    ),
    []
  )

  if (!forecast) return null

  return (
    <MDBox mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {renderInfoCard(
            forecast.locationName,
            formatDate(forecast.localtime),
            <MDBox
              display='grid'
              justifyContent='center'
              alignItems='center'
              component='img'
              src={forecast.conditionIcon}
              bgColor='secondary'
              color='white'
              width='3rem'
              height='3rem'
              shadow='md'
              borderRadius='lg'
              variant='gradient'
            />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderInfoCard(translate('humidity'), formatPercent(forecast.humidity / 100), 'opacity')}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderInfoCard(translate('temperature'), forecast.temperature.toString(), 'thermostat')}
        </Grid>
      </Grid>
    </MDBox>
  )
}

export default CurrentWeather
