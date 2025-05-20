import { memo, useCallback, useEffect, useState } from 'react'
import {
  AppBar,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
} from '@mui/material'
import { DatePicker, LocalizationProvider, MonthPicker, YearPicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { DateParamsType } from '~/app/presentation/common/types'
import { LoadingButton, MDBox, MDInput } from '~/app/presentation/components'
import { useDateHelper, useTranslation } from '~/app/presentation/hooks'
import breakpoints from '~/app/presentation/styles/theme/base/breakpoints'

type Props = {
  loading: boolean
  onSearch: (params: DateParamsType) => void
}

const FilterSeason: React.FC<Props> = ({ loading, onSearch, children }) => {
  const { translate } = useTranslation()
  const {
    formatISO,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    startOfQuarter,
    endOfQuarter,
  } = useDateHelper()

  const [tabsOrientation, setTabsOrientation] = useState<'horizontal' | 'vertical'>('horizontal')
  const [tabValue, setTabValue] = useState<number>(0)
  const [initialDate, setInitialDate] = useState<Date>(startOfMonth(new Date()))
  const [finalDate, setFinalDate] = useState<Date>(endOfMonth(new Date()))
  const [quarterly, setQuarterly] = useState<number>(1)

  const handleSetTabValue = (event: any, newValue: number) => setTabValue(newValue)

  const onSubmit = () => {
    const params = {
      ...(tabValue === 0 && {
        initialDate: formatISO(initialDate),
        finalDate: formatISO(finalDate),
      }),
      ...(tabValue === 1 && {
        initialDate: formatISO(startOfMonth(initialDate)),
        finalDate: formatISO(endOfMonth(initialDate)),
      }),
      ...(tabValue === 2 && {
        initialDate: formatISO(startOfQuarter(initialDate, quarterly)),
        finalDate: formatISO(endOfQuarter(startOfQuarter(initialDate, quarterly))),
      }),
      ...(tabValue === 3 && {
        initialDate: formatISO(startOfYear(initialDate)),
        finalDate: formatISO(endOfYear(initialDate)),
      }),
    }

    onSearch(params)
  }

  const renderYearPicker = useCallback(
    () => (
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
        <YearPicker
          disableFuture
          minDate={new Date(2020, 1, 1)}
          maxDate={new Date()}
          date={initialDate}
          onChange={setInitialDate}
        />
      </LocalizationProvider>
    ),
    [initialDate, setInitialDate]
  )

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

  useEffect(() => {
    const today = new Date()

    switch (tabValue) {
      case 0:
        setInitialDate(startOfMonth(today))
        setFinalDate(endOfMonth(today))
        break
      case 1:
        setInitialDate(startOfMonth(today))
        setFinalDate(endOfMonth(today))
        break
      case 2:
        setInitialDate(startOfQuarter(today, 1))
        setFinalDate(endOfQuarter(startOfQuarter(today, 1)))
        setQuarterly(1)
        break
      case 3:
        setInitialDate(startOfYear(today))
        setFinalDate(endOfYear(today))
        break
      default:
        setInitialDate(startOfMonth(today))
        setFinalDate(endOfMonth(today))
        break
    }
  }, [tabValue])

  return (
    <Grid container justifyContent='center' spacing={3}>
      <Grid item xs={12} md={6} lg={8}>
        <Grid container direction='column' spacing={3}>
          <Grid item md={12}>
            <Card>
              <MDBox p={3}>
                <AppBar position='static'>
                  <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                    <Tab disabled={loading} label={translate('common:filter:season')} />
                    <Tab disabled={loading} label={translate('common:filter:monthly')} />
                    <Tab disabled={loading} label={translate('common:filter:quarterly')} />
                    <Tab disabled={loading} label={translate('common:filter:yearly')} />
                  </Tabs>
                </AppBar>

                <MDBox mt={2}>
                  <Grid container spacing={2}>
                    {tabValue === 0 && (
                      <>
                        <Grid item md={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                            <DatePicker
                              label={translate('common:filter:initialDate')}
                              value={initialDate}
                              onChange={setInitialDate}
                              inputFormat='dd/MM/yyyy'
                              minDate={new Date(2020, 1, 1)}
                              disabled={loading}
                              renderInput={(params) => <MDInput fullWidth {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item md={6}>
                          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                            <DatePicker
                              label={translate('common:filter:finalDate')}
                              value={finalDate}
                              onChange={setFinalDate}
                              inputFormat='dd/MM/yyyy'
                              minDate={initialDate}
                              disabled={loading}
                              renderInput={(params) => <MDInput fullWidth {...params} />}
                            />
                          </LocalizationProvider>
                        </Grid>
                      </>
                    )}

                    {tabValue === 1 && (
                      <>
                        <Grid item md={12}>
                          {renderYearPicker()}
                        </Grid>
                        <Grid item md={12}>
                          <MDBox display='flex' justifyContent='center'>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                              <MonthPicker
                                disableFuture
                                minDate={new Date(2020, 1, 1)}
                                maxDate={new Date()}
                                date={initialDate}
                                onChange={setInitialDate}
                              />
                            </LocalizationProvider>
                          </MDBox>
                        </Grid>
                      </>
                    )}

                    {tabValue === 2 && (
                      <>
                        <Grid item md={12}>
                          {renderYearPicker()}
                        </Grid>
                        <Grid item md={12}>
                          <FormControl fullWidth>
                            <InputLabel id='quarterly-label'>
                              {translate('common:filter:quarter')}
                            </InputLabel>
                            <Select
                              labelId='quarterly-label'
                              id='quarterly'
                              value={quarterly.toString()}
                              label={translate('common:filter:quarter')}
                              onChange={(event: SelectChangeEvent) =>
                                setQuarterly(+event.target.value)
                              }
                              SelectDisplayProps={{ style: { height: 44 } }}
                              input={<OutlinedInput label={translate('common:filter:quarter')} />}
                            >
                              <MenuItem value={1}>
                                {translate('common:filter:firstQuarter')}
                              </MenuItem>
                              <MenuItem value={2}>
                                {translate('common:filter:secondQuarter')}
                              </MenuItem>
                              <MenuItem value={3}>
                                {translate('common:filter:thirdQuarter')}
                              </MenuItem>
                              <MenuItem value={4}>
                                {translate('common:filter:fourthTrimester')}
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </>
                    )}

                    {tabValue === 3 && (
                      <Grid item md={12}>
                        {renderYearPicker()}
                      </Grid>
                    )}
                  </Grid>
                </MDBox>

                {children}

                <LoadingButton
                  loading={loading}
                  title={translate('common:actions:search')}
                  loadingTitle={translate('common:actions:searching')}
                  onSubmit={onSubmit}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default memo(FilterSeason)
