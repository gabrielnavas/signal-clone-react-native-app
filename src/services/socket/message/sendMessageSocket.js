export const request = socket => ({ idChat, userId, messageText }, callback) => {
  socket.emit('sendMessageRequest', { idChat, userId, messageText }, callback)
}

export const success = socket => ({ secretKey }) => {
  socket.emit('sendMessageSuccess', { secretKey })
}

export const failure = socket => () => {
  socket.emit('sendMessageFailure')
}