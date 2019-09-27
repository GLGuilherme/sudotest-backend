const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database/crud')
const http = require('http')
const port = 3333
const ip = 'localhost'
const cadastrarAluno = require('./database/crud')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
)

app.get('/', (request, response) => {
  response.json({info: 'Node.js, Express, and Postgres API'})
})

app.get('/teste/:nome', db.getUsers)


app.listen(process.env.PORT || 3333);

/*app.listen(port, ip, () => {
  console.log(`App runing on port http://${ip}:${port}`)
})*/

/*const server = http.createServer((req, res) => {
  console.log('Recebendo uma request!')
  cadastrarAluno()
  res.end('<h1>Aqui fica o que vamos enviar para o navegador como resposta!</h1>')
})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})*/