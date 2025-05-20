import { useEffect, useMemo, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { setForecast } from '~/store/features/weather'
import { ForecastModel } from '~/app/domain/models'
import { GatewayContext } from '~/app/presentation/contexts'
import { useAppDispatch } from '~/app/presentation/hooks'

const GatewayProvider: React.FC = ({ children }) => {
  const dispatch = useAppDispatch()

  const [socket, setSocket] = useState<Socket | null>(null)

  const userId = useMemo(() => Math.random().toString(36).substring(2, 15), [])

  useEffect(() => {
    const socketConnected = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-user-id': userId,
          },
        },
      },
    })

    socketConnected.on(`${userId}-location-update`, (changedData: ForecastModel) => {
      console.log(`User ${userId} received location update:`, changedData)

      dispatch(setForecast({ success: true, data: changedData }))
    })

    setSocket(socketConnected)

    return () => {
      socketConnected.disconnect()
      setSocket(null)
    }
  }, [userId])

  return <GatewayContext.Provider value={{ userId, socket }}>{children}</GatewayContext.Provider>
}

export default GatewayProvider
