import { memo, useEffect, useMemo, useState } from 'react'
import { AppBar, Card, Grid, Tab, Tabs } from '@mui/material'
import { DateParamsType } from '~/app/presentation/common/types'
import { DateInput, LoadingButton, MDBox } from '~/app/presentation/components'
import { useDateHelper, useTranslation } from '~/app/presentation/hooks'
import { FormProvider } from '~/app/presentation/providers'
import breakpoints from '~/app/presentation/styles/theme/base/breakpoints'

type Props = {
  loading: boolean
  onSearch: (params: DateParamsType) => void
}

const FilterBetweenDays: React.FC<Props> = ({ loading, onSearch, children }) => {
  const { translate } = useTranslation()
  const { formatISO, startOfMonth, endOfMonth, getYesterday, subDays } = useDateHelper()

  const [tabsOrientation, setTabsOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [tabValue, setTabValue] = useState<number>(5)

  const defaultValues = useMemo(() => {
    const today = new Date()

    switch (tabValue) {
      case 0:
        return {
          initialDate: today,
          finalDate: today,
        }
      case 1:
        return {
          initialDate: getYesterday(),
          finalDate: getYesterday(),
        }
      case 2:
        return {
          initialDate: subDays(today, 7),
          finalDate: today,
        }
      case 3:
        return {
          initialDate: subDays(today, 30),
          finalDate: today,
        }
      case 4:
        return {
          initialDate: startOfMonth(subDays(today, 30)),
          finalDate: endOfMonth(subDays(today, 30)),
        }
      default:
        return {
          initialDate: startOfMonth(today),
          finalDate: endOfMonth(today),
        }
    }
  }, [tabValue])

  const handleSetTabValue = (event: any, newValue: number) => setTabValue(newValue)

  const onSubmit = (values: any) => {
    const { initialDate, finalDate, ...rest } = values

    onSearch({
      ...rest,
      initialDate: formatISO(initialDate),
      finalDate: formatISO(finalDate),
    })
  }

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation('vertical')
        : setTabsOrientation('horizontal')
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener('resize', handleTabsOrientation)

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleTabsOrientation)
  }, [tabsOrientation])

  return (
    <Grid container justifyContent='center' spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <Grid container direction='column' spacing={3}>
          <Grid item md={12}>
            <Card>
              <FormProvider {...{ defaultValues }} mode='onBlur'>
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBox p={3}>
                      <AppBar position='static'>
                        <Tabs
                          orientation={tabsOrientation}
                          value={tabValue}
                          onChange={handleSetTabValue}
                        >
                          <Tab disabled={loading} label={translate('common:filter:today')} />
                          <Tab disabled={loading} label={translate('common:filter:yesterday')} />
                          <Tab
                            disabled={loading}
                            label={translate('common:filter:lastSevenDays')}
                          />
                          <Tab
                            disabled={loading}
                            label={translate('common:filter:lastThirtyDays')}
                          />
                          <Tab
                            disabled={loading}
                            label={translate('common:filter:previousMonth')}
                          />
                          <Tab disabled={loading} label={translate('common:filter:currentMonth')} />
                        </Tabs>
                      </AppBar>

                      <MDBox mt={2}>
                        <Grid container spacing={2}>
                          <Grid item md={6}>
                            <DateInput name='initialDate' label='common:filter:initialDate' />
                          </Grid>

                          <Grid item md={6}>
                            <DateInput name='finalDate' label='common:filter:finalDate' />
                          </Grid>

                          {children}
                        </Grid>
                      </MDBox>

                      <LoadingButton
                        type='submit'
                        loading={loading}
                        title={translate('common:actions:search')}
                        loadingTitle={translate('common:actions:searching')}
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

export default memo(FilterBetweenDays)
