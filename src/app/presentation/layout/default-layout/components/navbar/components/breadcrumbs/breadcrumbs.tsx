import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home } from '@mui/icons-material'
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material'
import { RouteType } from '~/app/presentation/common/types'
import { MDBox, MDTypography } from '~/app/presentation/components'
import { useStringHelper } from '~/app/presentation/hooks'

type Props = {
  routesMenu: RouteType[]
  light?: boolean
}

const Breadcrumbs: React.FC<Props> = ({ routesMenu, light }) => {
  const { pathname } = useLocation()
  const { isUuid } = useStringHelper()

  const { title, routes } = useMemo(() => {
    if (pathname === '/') return { title: 'weathers', routes: [] }

    const routes = pathname
      .split('/')
      .slice(1)
      .filter((route) => !isUuid(route))
    const title = routes[routes.length - 1]

    return {
      title,
      routes: routes.slice(0, -1),
    }
  }, [pathname])

  const getTitleName = (routeName: string, countTimes: number = 0): string => {
    for (const routeMenu of routesMenu) {
      if (routeMenu.key === routeName) return routeMenu.name ?? routeName.replace('-', ' ')
      if (routeMenu.route === pathname) return routeMenu.name ?? routeName.replace('-', ' ')

      if (routeMenu.collapse?.length > 0) {
        for (const collapse of routeMenu.collapse) {
          if (collapse.key === routeName) return collapse.name ?? routeName.replace('-', ' ')
          if (collapse.route === pathname) return collapse.name ?? routeName.replace('-', ' ')

          if (collapse.collapse?.length > 0) {
            for (const collapseAgain of collapse.collapse) {
              if (collapseAgain.key === routeName)
                return collapseAgain.name ?? routeName.replace('-', ' ')
              if (collapseAgain.route === pathname)
                return collapseAgain.name ?? routeName.replace('-', ' ')
            }
          }
        }
      }
    }

    if (countTimes > 1) {
      return routeName.includes('create') ||
        routeName.includes('details') ||
        Number(routeName.replace(/\D/g, '')) > 0
        ? 'Detalhes'
        : ''
    }

    const routeAlternative = pathname
      .split('/')
      .slice(1)
      .filter((route) => !isUuid(route))
      .join('-')

    return getTitleName(routeAlternative, countTimes + 1)
  }

  return (
    <MDBox mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600]),
          },
        }}
      >
        <Link to='/'>
          <MDTypography
            component='span'
            variant='body2'
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Home />
          </MDTypography>
        </Link>
        {routes.map((el: string) => (
          <MDTypography
            key={el}
            component='span'
            variant='button'
            fontWeight='regular'
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            {getTitleName(el)}
          </MDTypography>
        ))}
        <MDTypography
          variant='button'
          fontWeight='regular'
          color={light ? 'white' : 'dark'}
          sx={{ lineHeight: 0 }}
        >
          {getTitleName(title)}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography fontWeight='bold' variant='h6' color={light ? 'white' : 'dark'} noWrap>
        {getTitleName(title)}
      </MDTypography>
    </MDBox>
  )
}

// Declaring default props for Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
}

export default Breadcrumbs
