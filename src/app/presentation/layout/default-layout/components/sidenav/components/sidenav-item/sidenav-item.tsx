import { ReactNode, useMemo } from 'react'
import { Collapse, Icon, ListItem, ListItemText } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { ColorType } from '~/app/presentation/common/types'
import { MDBox } from '~/app/presentation/components'
import { useToggleTheme } from '~/app/presentation/hooks'
import { item, itemArrow, itemContent } from './sidenav-item-styles'

// Declaring props types for SidenavCollapse
interface Props {
  color?: ColorType
  name: string
  active?: boolean | string
  nested?: boolean
  children?: ReactNode
  open?: boolean
  [key: string]: any
}

function SidenavItem({ color, name, active, nested, children, open, ...rest }: Props): JSX.Element {
  const {
    themeStorage: { theme, miniSidenav, transparentSidenav, whiteSidenav },
  } = useToggleTheme()

  const darkMode = useMemo(() => theme === 'dark', [theme])

  return (
    <>
      <ListItem
        {...rest}
        component='li'
        sx={(theme) => item(theme, { active, color, transparentSidenav, whiteSidenav, darkMode })}
      >
        <MDBox
          sx={(theme: Theme): any =>
            itemContent(theme, {
              active,
              miniSidenav,
              name,
              open,
              nested,
              transparentSidenav,
              whiteSidenav,
              darkMode,
            })
          }
        >
          <ListItemText primary={name} />
          {children && (
            <Icon
              component='i'
              sx={(theme) =>
                itemArrow(theme, { open, miniSidenav, transparentSidenav, whiteSidenav, darkMode })
              }
            >
              expand_less
            </Icon>
          )}
        </MDBox>
      </ListItem>
      {children && (
        <Collapse in={open} timeout='auto' unmountOnExit {...rest}>
          {children}
        </Collapse>
      )}
    </>
  )
}

// Declaring default props for SidenavItem
SidenavItem.defaultProps = {
  color: 'info',
  active: false,
  nested: false,
  children: false,
  open: false,
}

export default SidenavItem
