import { memo, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { container } from '~/ioc/inversify.config'
import { store } from '~/store/store'
import { FullPageLoading } from '~/app/presentation/components'
import { ContainerProvider, GatewayProvider, ThemeProvider } from '~/app/presentation/providers'
import { RoutesConfig } from '../config/routes-config'
import { makeRoutes } from '../factories/routes'

setupListeners(store.dispatch)

const Router: React.FC = () => (
  <ContainerProvider container={container}>
    <Suspense fallback={<FullPageLoading />}>
      <Provider store={store}>
        <GatewayProvider>
          <ThemeProvider>
            <BrowserRouter>
              <CssBaseline />
              {makeRoutes(RoutesConfig)}
            </BrowserRouter>
          </ThemeProvider>
        </GatewayProvider>
      </Provider>
    </Suspense>
  </ContainerProvider>
)

export default memo(Router)
