import { memo } from 'react'
import { Card, Grid } from '@mui/material'
import { getWeathertate } from '~/store/features/weather'
import {
  LoadingButton,
  MDAlert,
  MDBox,
  MDTypography,
  TextInput,
} from '~/app/presentation/components'
import {
  useAppSelector,
  useGateway,
  useLazyLoadForecastByCityQuery,
  useTranslation,
} from '~/app/presentation/hooks'
import { FormProvider } from '~/app/presentation/providers'

const SearchCity = () => {
  const { translate } = useTranslation('weathers')
  const { forecastResult } = useAppSelector(getWeathertate)
  const { userId } = useGateway()

  const [loadForecastByCity, { isLoading, error: errorLoadingByCity }] =
    useLazyLoadForecastByCityQuery()

  const onSubmit = (values: { cityName: string }) => {
    loadForecastByCity({ ...values, userId })
  }

  return (
    <Grid container justifyContent='center' spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <Grid container direction='column' spacing={3}>
          <Grid item md={12}>
            <Card>
              {errorLoadingByCity && (
                <MDAlert color='error' dismissible>
                  <MDTypography variant='body2' color='white'>
                    {translate((errorLoadingByCity as { message: string }).message)}
                  </MDTypography>
                </MDAlert>
              )}

              <FormProvider
                defaultValues={{ cityName: forecastResult?.data?.locationName }}
                mode='onBlur'
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBox p={3}>
                      <MDBox mt={2}>
                        <Grid container spacing={2}>
                          <Grid item md={12}>
                            <TextInput
                              name='cityName'
                              label={translate('cityNameField')}
                              disabled={isLoading}
                            />
                          </Grid>
                        </Grid>
                      </MDBox>

                      <LoadingButton
                        type='submit'
                        loading={isLoading}
                        title={translate('common:actions:search')}
                        loadingTitle={translate('common:actions:searching')}
                        color='secondary'
                      />
                    </MDBox>
                  </form>
                )}
              </FormProvider>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default memo(SearchCity)
