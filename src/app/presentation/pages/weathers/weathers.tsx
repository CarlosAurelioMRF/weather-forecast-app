import { useCallback, useEffect, useMemo } from 'react'
import { Card, CircularProgress } from '@mui/material'
import { Column } from 'devextreme-react/data-grid'
import { getWeathertate } from '~/store/features/weather'
import { ForecastDayModel } from '~/app/domain/models'
import { DataTable, MDAlert, MDBox, MDTypography } from '~/app/presentation/components'
import {
  useAppSelector,
  useGateway,
  useLazyLoadForecastByCoordinatesQuery,
  useStringHelper,
  useTranslation,
  useUserLocation,
} from '~/app/presentation/hooks'
import { CurrentWeather, SearchCity } from './components'

const WeathersPage = () => {
  const { translate } = useTranslation('weathers')
  const { userId } = useGateway()
  const { location, error: errorLocation } = useUserLocation()
  const { forecastResult } = useAppSelector(getWeathertate)
  const { formatPercent } = useStringHelper()

  const [loadForecastByCoordinates, { isLoading, error: errorLoadingByCoordinates }] =
    useLazyLoadForecastByCoordinatesQuery()

  const forecastDay = useMemo(
    () => forecastResult?.data?.forecastDay ?? [],
    [forecastResult?.data?.forecastDay]
  )

  const errorMessage = useMemo(
    () => errorLocation ?? errorLoadingByCoordinates?.message ?? forecastResult?.message,
    [errorLocation, errorLoadingByCoordinates, forecastResult?.message]
  )

  const calculateHumidity = useCallback(
    (forecastDay: ForecastDayModel) => formatPercent(forecastDay.avghumidity / 100),
    []
  )

  useEffect(() => {
    if (!location) return

    loadForecastByCoordinates({ ...location, userId })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, location])

  return (
    <MDBox mt={1.5} pb={3}>
      <MDBox mb={3}>
        <SearchCity />
      </MDBox>

      <CurrentWeather />

      <MDBox mb={3}>
        <Card>
          <MDBox
            p={3}
            pb={0}
            lineHeight={1}
            display='flex'
            alignContent='center'
            justifyContent='space-between'
          >
            <MDTypography variant='h5' fontWeight='medium'>
              {translate('titlePage')}
            </MDTypography>
          </MDBox>

          {errorMessage && (
            <MDAlert color='error' dismissible>
              <MDTypography variant='body2' color='white'>
                {translate(errorMessage)}
              </MDTypography>
            </MDAlert>
          )}

          {isLoading && (
            <MDBox p={2} height='100%' display='flex' justifyContent='center' alignItems='center'>
              <CircularProgress />
            </MDBox>
          )}

          {!isLoading && (
            <DataTable data={forecastDay} keyExpr='date' exporFileName={translate('titlePage')}>
              <Column caption={translate('dateField')} dataField='date' dataType='date' />

              <Column
                caption={translate('conditionField')}
                dataField='condition'
                dataType='string'
              />

              <Column
                caption={translate('avghumidityField')}
                dataField='avghumidity'
                dataType='number'
                calculateCellValue={calculateHumidity}
              />

              <Column caption={translate('minTempField')} dataField='minTemp' dataType='number' />

              <Column caption={translate('maxTempField')} dataField='maxTemp' dataType='number' />
            </DataTable>
          )}
        </Card>
      </MDBox>
    </MDBox>
  )
}

export default WeathersPage
