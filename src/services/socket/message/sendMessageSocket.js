import { socket } from '../../helpers/socket'

export default ({ idChat, userId, messageText }) => {
  socket.on('connect', () => {
    console.log('oiii')
    // const response = ({ status, body }) => {
    //   if (status === 200) {
    //     console.log(body);
    //   }
    //   return body
    // }
    // socket.on('sendMessage', { idChat, userId, messageText, response})
    socket.emit('sendMessage', { messageText })
  })
}