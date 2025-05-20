import { ColorType } from './color-type'

export type ThemeStorage = {
  theme: string
  miniSidenav: boolean
  transparentSidenav: boolean
  whiteSidenav: boolean
  openConfigurator: boolean
  sidenavColor: ColorType
}
