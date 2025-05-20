import { useEffect, useMemo, useState } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material'
import { ColorType, ThemeStorage } from '~/app/presentation/common/types'
import { ThemeContext } from '~/app/presentation/contexts'
import { makeDarkTheme, makeLightTheme } from '~/app/presentation/styles'

const DEFAULT_THEME: ThemeStorage = {
  theme: 'light',
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: false,
  openConfigurator: false,
  sidenavColor: 'info',
}

const getThemeFromLocalStorage = (): ThemeStorage => {
  const data = localStorage.getItem('@weathers/theme')

  if (!data) return DEFAULT_THEME

  return JSON.parse(data) as ThemeStorage
}

const setThemeOnLocalStorage = (theme: string) => localStorage.setItem('@weathers/theme', theme)

const ThemeProvider: React.FC = ({ children }) => {
  const [themeStorage, setThemeStorage] = useState<ThemeStorage>(getThemeFromLocalStorage())

  const theme = useMemo(
    () => (themeStorage.theme === 'dark' ? makeDarkTheme() : makeLightTheme()),
    [themeStorage.theme]
  )

  const handleTheme = (theme: string): void => {
    setThemeStorage({
      ...themeStorage,
      openConfigurator: false,
      theme,
    })

    window.location.reload()
  }

  const toggleMiniSidenav = (): void => {
    setThemeStorage({
      ...themeStorage,
      miniSidenav: !themeStorage.miniSidenav,
    })
  }

  const handleOpenConfigurator = (value: boolean): void => {
    setThemeStorage({
      ...themeStorage,
      openConfigurator: value,
    })
  }

  const handleMiniSidenav = (value: boolean): void => {
    setThemeStorage({
      ...themeStorage,
      miniSidenav: value,
    })
  }

  const handleTransparentSidenav = (value: boolean): void => {
    setThemeStorage({
      ...themeStorage,
      transparentSidenav: value,
    })
  }

  const handleWhiteSidenav = (value: boolean): void => {
    setThemeStorage({
      ...themeStorage,
      whiteSidenav: value,
    })
  }

  const handleSidenavColor = (value: ColorType): void => {
    setThemeStorage({
      ...themeStorage,
      sidenavColor: value,
    })
  }

  useEffect(() => {
    if (!themeStorage) return

    setThemeOnLocalStorage(JSON.stringify(themeStorage))
  }, [themeStorage])

  useEffect(() => {
    const themeFromStorage = getThemeFromLocalStorage()

    if (themeFromStorage.theme === 'dark') {
      require('devextreme/dist/css/dx.dark.css')
      return
    }

    require('devextreme/dist/css/dx.light.css')
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          themeStorage,
          handleTheme,
          toggleMiniSidenav,
          handleOpenConfigurator,
          handleMiniSidenav,
          handleTransparentSidenav,
          handleWhiteSidenav,
          handleSidenavColor,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

export default ThemeProvider
