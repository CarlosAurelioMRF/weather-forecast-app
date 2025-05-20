import { configureStore } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { browserHistory } from '~/app/main/factories/routes/browser-history'
import { apiSlice } from './features/api/slice/api-slice'
import { weatherSlice } from './features/weather'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [weatherSlice.name]: weatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware, routerMiddleware(browserHistory)]),
})
