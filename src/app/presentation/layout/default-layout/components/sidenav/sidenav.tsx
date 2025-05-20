import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Close } from '@mui/icons-material'
import { Divider, Link, List } from '@mui/material'
import { RouteType } from '~/app/presentation/common/types'
import { MDBox, MDTypography } from '~/app/presentation/components'
import { useToggleTheme, useTranslation } from '~/app/presentation/hooks'
import { SidenavCollapse, SidenavItem, SidenavList } from './components'
import { sidenavLogoLabel, SidenavRoot } from './sidenav-styles'

type Props = {
  routesMenu: RouteType[]
  [key: string]: any
}

const Sidenav: React.FC<Props> = ({ routesMenu, isDarkMode, onMouseEnter, onMouseLeave }) => {
  const location = useLocation()
  const { translate } = useTranslation()
  const {
    themeStorage: { miniSidenav, sidenavColor, transparentSidenav, whiteSidenav },
    handleMiniSidenav,
    handleTransparentSidenav,
    handleWhiteSidenav,
  } = useToggleTheme()

  const [openCollapse, setOpenCollapse] = useState<boolean | string>(false)
  const [openNestedCollapse, setOpenNestedCollapse] = useState<boolean | string>(false)

  const { pathname, collapseName, items } = useMemo(
    () => ({
      pathname: location.pathname,
      items: location.pathname.split('/').slice(1),
      collapseName: location.pathname.split('/').slice(1)[0],
    }),
    [location]
  )

  const { itemParentName, itemName } = useMemo(
    () => ({
      itemParentName: items[1],
      itemName: items[items.length - 1],
    }),
    [items]
  )

  const textColor = useMemo(() => {
    if (transparentSidenav || (whiteSidenav && !isDarkMode)) {
      return 'dark'
    }

    if (whiteSidenav && isDarkMode) {
      return 'inherit'
    }

    return 'white'
  }, [transparentSidenav, whiteSidenav, isDarkMode])

  const closeSidenav = () => handleMiniSidenav(true)

  useEffect(() => {
    setOpenCollapse(collapseName)
    setOpenNestedCollapse(itemParentName)
  }, [])

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    const handle = () => {
      handleMiniSidenav(window.innerWidth < 1200)
      handleTransparentSidenav(window.innerWidth < 1200 ? false : transparentSidenav)
      handleWhiteSidenav(window.innerWidth < 1200 ? false : whiteSidenav)
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener('resize', handle)

    // Call the handleMiniSidenav function to set the state with the initial value.
    handle()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handle)
  }, [location, transparentSidenav, whiteSidenav])

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = useCallback(
    (collapse: RouteType[]) =>
      collapse.map(({ name, route, key, href }: RouteType) =>
        href ? (
          <Link
            key={key}
            href={href}
            target='_blank'
            rel='noreferrer'
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem name={name} nested />
          </Link>
        ) : (
          <NavLink to={route} key={key} style={{ textDecoration: 'none' }}>
            <SidenavItem name={name} active={route === pathname} nested />
          </NavLink>
        )
      ),
    [pathname]
  )

  // Render the all the collpases from the routes.js
  const renderCollapse = useCallback(
    (collapses: RouteType[]) =>
      collapses.map(({ name, collapse, route, href, key, onClick }: RouteType) => {
        let returnValue

        if (collapse) {
          returnValue = (
            <SidenavItem
              key={key}
              color={sidenavColor}
              name={name}
              active={key === itemParentName ? 'isParent' : false}
              open={openNestedCollapse === key}
              onClick={({ currentTarget }: any) =>
                openNestedCollapse === key && currentTarget.classList.contains('MuiListItem-root')
                  ? setOpenNestedCollapse(false)
                  : setOpenNestedCollapse(key)
              }
            >
              {renderNestedCollapse(collapse)}
            </SidenavItem>
          )
        } else if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target='_blank'
              rel='noreferrer'
              sx={{ textDecoration: 'none' }}
            >
              <SidenavItem
                color={sidenavColor}
                name={name}
                active={key === itemName || key === itemParentName}
              />
            </Link>
          )
        } else if (onClick) {
          returnValue = (
            <SidenavItem
              color={sidenavColor}
              name={name}
              active={key === itemName || key === itemParentName}
              onClick={onClick}
            />
          )
        } else {
          returnValue = (
            <NavLink to={route} key={key} style={{ textDecoration: 'none' }}>
              <SidenavItem
                color={sidenavColor}
                name={name}
                active={key === itemName || key === itemParentName}
              />
            </NavLink>
          )
        }

        return <SidenavList key={key}>{returnValue}</SidenavList>
      }),
    [openNestedCollapse, sidenavColor, itemParentName, itemName, renderNestedCollapse]
  )

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = useCallback(
    () =>
      routesMenu.map(
        ({ type, name, icon, title, collapse, noCollapse, key, href, route }: RouteType) => {
          if (type === 'collapse') {
            if (href) {
              return (
                <Link
                  href={href}
                  key={key}
                  target='_blank'
                  rel='noreferrer'
                  sx={{ textDecoration: 'none' }}
                  onMouseDown={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <SidenavCollapse
                    name={name}
                    icon={icon}
                    active={key === collapseName}
                    noCollapse={noCollapse}
                  />
                </Link>
              )
            }
            if (noCollapse && route) {
              return (
                <NavLink
                  to={route}
                  key={key}
                  onMouseDown={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                >
                  <SidenavCollapse
                    name={name}
                    icon={icon}
                    noCollapse={noCollapse}
                    active={key === collapseName}
                  >
                    {collapse ? renderCollapse(collapse) : null}
                  </SidenavCollapse>
                </NavLink>
              )
            }

            return (
              <SidenavCollapse
                key={key}
                name={name}
                icon={icon}
                active={key === collapseName}
                open={openCollapse === key}
                onClick={() =>
                  openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key)
                }
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            )
          }

          if (type === 'title') {
            return (
              <MDTypography
                key={key}
                color={textColor}
                display='block'
                variant='caption'
                fontWeight='bold'
                textTransform='uppercase'
                pl={3}
                mt={2}
                mb={1}
                ml={1}
              >
                {title}
              </MDTypography>
            )
          }

          if (type === 'divider') {
            return (
              <Divider
                key={key}
                light={
                  (!isDarkMode && !whiteSidenav && !transparentSidenav) ||
                  (isDarkMode && !transparentSidenav && whiteSidenav)
                }
              />
            )
          }

          return null
        }
      ),
    [
      routesMenu,
      openCollapse,
      openNestedCollapse,
      isDarkMode,
      whiteSidenav,
      transparentSidenav,
      renderCollapse,
    ]
  )

  useEffect(() => {
    if (window.innerWidth < 1200) {
      handleMiniSidenav(true)
    }
  }, [pathname])

  return (
    <SidenavRoot
      variant='permanent'
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode: isDarkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign='center'>
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position='absolute'
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant='h6' color='secondary'>
            <Close sx={{ fontWeight: 'bold' }} />
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to='/' display='flex' alignItems='center'>
          <MDBox component='img' src={'/images/favicon.png'} alt='Brand' width='2rem' />
          <MDBox sx={(theme: any) => sidenavLogoLabel(theme, { miniSidenav })}>
            <MDTypography component='h6' variant='button' fontWeight='medium' color={textColor}>
              {translate('common:applicationName').toUpperCase()}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!isDarkMode && !whiteSidenav && !transparentSidenav) ||
          (isDarkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes()}</List>
    </SidenavRoot>
  )
}

export default Sidenav
