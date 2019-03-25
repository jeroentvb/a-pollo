const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 40510 })

wss.broadcast = msg => {
  wss.clients.forEach(client => {
    client.send(msg)
  })
}

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log('received: %s', message)
//   })
// })

// wss.on('close', () => {
//   console.log('Websocket disconnected')
// })

module.exports = wss
