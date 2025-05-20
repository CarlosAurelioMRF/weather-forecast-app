import React from 'react'
import { ThemeProvider } from '~/app/presentation/providers'

export const makeThemeProvider: React.FC = ({ children }): React.ReactElement => (
  <ThemeProvider>{children}</ThemeProvider>
)
