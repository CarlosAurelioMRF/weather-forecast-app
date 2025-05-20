import { ColorType } from './color-type'
import { ThemeStorage } from './theme-storage-type'

export type ThemeContextType = {
  handleTheme: (theme: string) => void
  toggleMiniSidenav: () => void
  handleOpenConfigurator: (value: boolean) => void
  handleMiniSidenav: (value: boolean) => void
  handleTransparentSidenav: (value: boolean) => void
  handleWhiteSidenav: (value: boolean) => void
  handleSidenavColor: (value: ColorType) => void
  themeStorage: ThemeStorage
}
