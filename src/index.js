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
app.get('/buscaAlunosCadastrados', AlunoController.buscarAlunosCadastrados);

app.post('/cadastroQuestao', QuestoesController.cadastraQuestao);
app.post('/deletaQuestaoCadastrada', QuestoesController.deletarQuestaoCadastrada);
app.post('/atualizaQuestaoCadastrada', QuestoesController.atualizarQuestaoCadastrada);
app.get('/buscaQuestoesCadastradas', QuestoesController.buscarQuestoesCadastradas);
app.get('/buscaQuestaoDeletarQuestao', QuestoesController.buscarQuestaoDeletarQuestao);

app.post('/cadastroProva', ProvasController.cadastraProvas);
app.post('/atualizaProva', ProvasController.atualizarProva);
app.post('/deletaProva', ProvasController.deletarProva);
app.get('/buscaProvas', ProvasController.buscarProvas);
app.get('/buscaProvasDeletarQuestoes', ProvasController.buscarProvasDeletarQuestoes);
app.post('/encerraProva', ProvasController.encerrarProva);

app.post('/token', ProvasController.token);
app.get('/buscaToken', ProvasController.buscarToken);

app.post('/cadastraAlunosProvas', Alunos_ProvasController.cadastrarAlunosProvas);
app.get('/buscaAlunosProvas', Alunos_ProvasController.buscarAlunosProvas);
app.get('/validaAlunosProvas', Alunos_ProvasController.validarAlunosProvas);
app.get('/geraRelatorio', Alunos_ProvasController.gerarRelatorio);

app.get('/buscaProvasQuestoes', Provas_QuestoesController.buscarProvasQuestoes);
app.get('/buscaTodasProvasQuestoes', Provas_QuestoesController.buscarTodasProvasQuestoes);
app.post('/deletaAtualizaProvasQuestoes', Provas_QuestoesController.deletarAtualizarProvasQuestoes);

app.post('/cadastraAlunosProvasQuestoes', Alunos_Provas_QuestoesController.cadastrarAlunosProvasQuestoes);
app.get('/buscaAlunosProvasQuestoes', Alunos_Provas_QuestoesController.buscarAlunosProvasQuestoes);
app.put('/atualizaAlunosProvasQuestoes', Alunos_Provas_QuestoesController.atualizarAlunosProvasQuestoes);
app.get('/calculaMedia', Alunos_Provas_QuestoesController.calcularMedia);

app.get('/buscaAluno', AlunoController.buscarAluno);

app.listen(process.env.PORT || 3333);