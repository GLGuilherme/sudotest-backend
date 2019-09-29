const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./database/crud')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
)

app.get('/', (request, response) => {
  response.json({info: 'ricardo viadão'})
})

app.get('/cadastroAluno', db.cadastraAluno)


app.listen(process.env.PORT || 3333);