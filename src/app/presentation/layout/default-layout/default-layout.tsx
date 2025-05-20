import React, { useMemo, useState } from 'react'
import { MDAvatar, MDBox } from '~/app/presentation/components'
import { useStringHelper, useToggleTheme, useTranslation } from '~/app/presentation/hooks'
import { Configurator, Footer, Navbar, Sidenav } from './components'

const BasicLayout: React.FC = ({ children }) => {
  const { translate } = useTranslation()
  const { getAvatar } = useStringHelper()
  const {
    themeStorage: { theme, miniSidenav, openConfigurator },
    toggleMiniSidenav,
    handleOpenConfigurator,
  } = useToggleTheme()

  const [onMouseEnter, setOnMouseEnter] = useState(false)

  const isDarkMode = useMemo(() => theme === 'dark', [theme])
  const routesMenu = useMemo(
    () => [
      {
        type: 'collapse',
        name: 'Anonymous',
        key: 'brooklyn-alice',
        icon: <MDAvatar src={getAvatar()} alt={'anonymous'} size='sm' />,
        collapse: [
          {
            name: translate('common:actions:settings'),
            key: 'profile-settings',
            onClick: () => handleOpenConfigurator(!openConfigurator),
          },
        ],
      },
      { type: 'divider', key: 'divider-0' },
      {
        type: 'collapse',
        name: 'Weather',
        key: 'weathers',
        route: 'weathers',
        icon: 'movie_creation',
        noCollapse: true,
      },
    ],
    [openConfigurator]
  )

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      toggleMiniSidenav()
      setOnMouseEnter(true)
    }
  }

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      toggleMiniSidenav()
      setOnMouseEnter(false)
    }
  }

  return (
    <>
      <Sidenav
        isDarkMode={isDarkMode}
        routesMenu={routesMenu}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />

      <MDBox
        sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
          p: 3,
          position: 'relative',

          [breakpoints.up('xl')]: {
            marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
            transition: transitions.create(['margin-left', 'margin-right'], {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            }),
          },
        })}
      >
        <Navbar routesMenu={routesMenu} />

        {children}

        <Footer />
      </MDBox>

      <Configurator darkMode={isDarkMode} />
    </>
  )
}

export default BasicLayout
