import { lazy } from 'react'
import { IRoute } from '~/app/main/types'

export const RoutesConfig: IRoute[] = [
  {
    name: 'weathers',
    path: '/',
    exact: true,
    component: lazy(async () => import('~/app/presentation/pages/weathers/weathers')),
    layout: 'DefaultLayout',
  },
]
