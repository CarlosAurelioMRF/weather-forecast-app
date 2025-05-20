export type ForecastModel = {
  locationName: string
  localtime: string
  humidity: number
  conditionIcon: string
  temperature: number
  forecastDay: ForecastDayModel[]
}

export type ForecastDayModel = {
  date: string
  avghumidity: number
  maxTemp: number
  minTemp: number
  condition: string
}
