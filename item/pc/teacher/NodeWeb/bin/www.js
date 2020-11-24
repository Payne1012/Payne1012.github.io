const http = require('http')

const serverHandle = require('../app')

const PORT = 8888

const server = http.createServer(serverHandle)

server.listen(PORT)
