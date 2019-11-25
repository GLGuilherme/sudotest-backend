const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const AlunoController = require('./controllers/AlunoController');
const QuestoesController = require('./controllers/QuestoesController');
const ProvasController = require('./controllers/ProvasController');
const Alunos_ProvasController = require('./controllers/Alunos_ProvasController');
const Provas_QuestoesController = require('./controllers/Provas_QuestoesController');
const Alunos_Provas_QuestoesController = require('./controllers/Alunos_Provas_QuestoesController');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended:true,
  })
)
app.use(express.urlencoded({extended: false}));

app.use(cors());
app.use(express.json());

app.post('/cadastroAluno', AlunoController.cadastraAluno);
app.post('/aluno', AlunoController.login);
app.post('/cadastroQuestao', QuestoesController.cadastraQuestao);
app.post('/cadastroProva', ProvasController.cadastraProvas);
app.post('/token', ProvasController.token);
app.post('/cadastraAlunosProvas', Alunos_ProvasController.cadastrarAlunosProvas);
app.get('/buscaAlunosProvas', Alunos_ProvasController.buscarAlunosProvas);
app.get('/buscaProvasQuestoes', Provas_QuestoesController.buscarProvasQuestoes);
app.post('/cadastraAlunosProvasQuestoes', Alunos_Provas_QuestoesController.cadastrarAlunosProvasQuestoes);
app.get('/buscaAlunosProvasQuestoes', Alunos_Provas_QuestoesController.buscarAlunosProvasQuestoes);


app.listen(process.env.PORT || 3333);