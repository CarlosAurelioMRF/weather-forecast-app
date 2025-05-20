import { useCallback, useEffect, useMemo } from 'react'
import { Card, CircularProgress } from '@mui/material'
import { Column } from 'devextreme-react/data-grid'
import { getWeathertate } from '~/store/features/weather'
import { ForecastDayModel } from '~/app/domain/models'
import { DataTable, MDAlert, MDBox, MDTypography } from '~/app/presentation/components'
import {
  useAppSelector,
  useLazyLoadForecastByCoordinatesQuery,
  useStringHelper,
  useTranslation,
  useUserLocation,
} from '~/app/presentation/hooks'
import { CurrentWeather, SearchCity } from './components'

const WeathersPage = () => {
  const { translate } = useTranslation('weathers')
  const { location, error: errorLocation } = useUserLocation()
  const { forecast } = useAppSelector(getWeathertate)
  const { formatPercent } = useStringHelper()

  const [loadForecastByCoordinates, { isLoading, error: errorLoadingByCoordinates }] =
    useLazyLoadForecastByCoordinatesQuery()

  const forecastDay = useMemo(() => forecast?.forecastDay ?? [], [forecast])

  const error = useMemo(
    () => errorLocation ?? errorLoadingByCoordinates,
    [errorLocation, errorLoadingByCoordinates]
  )

  const calculateHumidity = useCallback(
    (forecastDay: ForecastDayModel) => formatPercent(forecastDay.avghumidity / 100),
    []
  )

  useEffect(() => {
    if (!location) return

    loadForecastByCoordinates(location)
  }, [])

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

          {error && (
            <MDAlert color='error' dismissible>
              <MDTypography variant='body2' color='white'>
                {translate((error as { message: string }).message)}
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
