import { useContext } from 'react'
import { GatewayContextType } from '~/app/presentation/common/types'
import { GatewayContext } from '~/app/presentation/contexts'

export const useGateway = (): GatewayContextType => {
  const context = useContext(GatewayContext)

  if (!context) {
    throw new Error('useGateway must be used within a GatewayProvider')
  }

  return context
}
