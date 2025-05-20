import { Route } from 'react-router-dom'
import { Switch } from 'react-router'
import { LayoutConfig } from '~/app/main/config/layouts-config'
import { IRoute } from '../../types'

export const makeRoutes = (routes: IRoute[]) => {
  return routes.map((route) => {
    const Layout = LayoutConfig[route.layout].component

    return (
      <Switch key={route.path}>
        <Layout>
          <Route exact={route.exact} path={route.path} component={route.component} />
        </Layout>
      </Switch>
    )
  })
}
