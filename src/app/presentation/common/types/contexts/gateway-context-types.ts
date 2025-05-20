import { Socket } from 'socket.io-client'

export type GatewayContextType = {
  userId: string
  socket: Socket
}
