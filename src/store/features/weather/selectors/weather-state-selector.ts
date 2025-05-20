import { createSelector } from 'reselect'
import { RootState } from '~/store/types'

const weathersSliceSelector = (state: RootState) => state.weatherSlice

export const getWeathertate = createSelector(weathersSliceSelector, (weather) => {
  return { ...weather }
})
