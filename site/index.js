// Trabalho Interdisciplinar 1 - Aplicações Web
//
// Esse módulo implementa uma API RESTful baseada no JSONServer
//
// Para montar um servidor para o seu projeto, acesse o projeto 
// do JSONServer no Replit, faça o FORK do projeto e altere o 
// arquivo db.json para incluir os dados do seu projeto.
//
//
// Autor: Gabriel Mayer Clary
// Data: 28/06/2024
// Wise Wallet - T.I. 1 - Aplicações Web

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('/assets/db/db.json')
const cors = require('cors');

// Para permitir que os dados sejam alterados, altere a linha abaixo
// colocando o atributo readOnly como false.
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running em http://localhost:5502')
})