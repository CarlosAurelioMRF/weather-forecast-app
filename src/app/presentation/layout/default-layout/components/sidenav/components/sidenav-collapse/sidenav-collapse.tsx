import { ReactNode, useMemo } from 'react'
import { Collapse, Icon, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { MDBox } from '~/app/presentation/components'
import { useToggleTheme } from '~/app/presentation/hooks'
import {
  collapseArrow,
  collapseIcon,
  collapseIconBox,
  collapseItem,
  collapseText,
} from './sidenav-collapse-styles'

interface Props {
  icon: ReactNode
  name: string
  children?: ReactNode
  active?: Boolean
  noCollapse?: Boolean
  open?: Boolean
  [key: string]: any
}

function SidenavCollapse({
  icon,
  name,
  children,
  active,
  noCollapse,
  open,
  ...rest
}: Props): JSX.Element {
  const {
    themeStorage: { theme, miniSidenav, transparentSidenav, whiteSidenav },
  } = useToggleTheme()

  const darkMode = useMemo(() => theme === 'dark', [theme])

  return (
    <>
      <ListItem component='li'>
        <MDBox
          {...rest}
          sx={(theme: any) =>
            collapseItem(theme, { active, transparentSidenav, whiteSidenav, darkMode })
          }
        >
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode })}
          >
            {typeof icon === 'string' ? (
              <Icon sx={(theme) => collapseIcon(theme)}>{icon}</Icon>
            ) : (
              icon
            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) =>
              collapseText(theme, {
                miniSidenav,
                transparentSidenav,
                whiteSidenav,
                active,
              })
            }
          />

          {!!children && (
            <Icon
              sx={(theme) =>
                collapseArrow(theme, {
                  noCollapse,
                  transparentSidenav,
                  whiteSidenav,
                  miniSidenav,
                  open,
                  active,
                  darkMode,
                })
              }
            >
              expand_less
            </Icon>
          )}
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={Boolean(open)} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  )
}

// Declaring default props for SidenavCollapse
SidenavCollapse.defaultProps = {
  active: false,
  noCollapse: false,
  children: false,
  open: false,
}

export default SidenavCollapse
