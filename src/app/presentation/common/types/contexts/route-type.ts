export type RouteType = {
  key: string
  name?: string
  type?: string
  route?: string
  href?: string
  title?: string
  icon?: React.ReactNode
  noCollapse?: boolean
  onClick?: () => void
  collapse?: RouteType[]
}

export type RouteTreeList = {
  key: string
  id?: string
  granFatherKey?: string
  fatherKey?: string
  name: string
}
