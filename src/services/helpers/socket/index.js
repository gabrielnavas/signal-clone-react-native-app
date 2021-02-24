import io from "socket.io-client"

const getSocket = () => {
  return io("ws://192.168.0.104:3030")
}

export { getSocket }