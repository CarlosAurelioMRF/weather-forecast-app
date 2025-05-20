import { LayoutConfig } from '../config/layouts-config'

export type IRoute = {
  name: string
  fatherName?: string
  path: string
  exact: boolean
  fallback?: React.ReactNode
  component?: React.LazyExoticComponent<React.ComponentType<any>>
  routes?: IRoute[]
  redirect?: string
  private?: boolean
  layout: keyof typeof LayoutConfig
}
