const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const AlunoController = require('./controllers/AlunoController');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
)

app.use(cors());
app.use(express.json());

app.post('/cadastroAluno', AlunoController.cadastraAluno);
app.post('/aluno', AlunoController.login);


app.listen(process.env.PORT || 3333);