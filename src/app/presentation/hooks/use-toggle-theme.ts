import { useContext } from 'react'
import { ThemeContextType } from '~/app/presentation/common/types'
import { ThemeContext } from '~/app/presentation/contexts'

export const useToggleTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useToggleTheme must be used within a ThemeProvider')
  }

  return context
}
