import React, { JSXElementConstructor, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { Store } from '@reduxjs/toolkit'
import { render as testingLibraryRender } from '@testing-library/react'
import { Container } from 'inversify'
import { container } from '~/ioc/inversify.config'
import { store } from '~/store/store'
import { ContainerProvider } from '../providers'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: any) => str,
      i18n: {
        changeLanguage: async () => new Promise(() => {}),
      },
    }
  },
}))

export class RenderWithProviders {
  providers: JSX.Element[] = []

  static instance() {
    return new RenderWithProviders()
  }

  inversify(containerParam: Container = container) {
    this.providers.push(<ContainerProvider container={containerParam} />)
    return this
  }

  redux(storeParam: Store = store) {
    this.providers.push(<Provider store={storeParam} />)
    return this
  }

  build() {
    return (ui: ReactElement<any, string | JSXElementConstructor<any>>) =>
      testingLibraryRender(ui, {
        wrapper: ({ children }) =>
          [...this.providers].reduce((previous, current) => {
            return React.cloneElement(current, {}, previous)
          }, children),
      })
  }
}
