const { Provas, Questoes } = require("../../app/models");
const Provas_QuestoesController = require('../controllers/Provas_QuestoesController');

async function questoes(qtdQuestoes, categoria, idProva) {
    await Questoes.findAll({ where: { categoria: categoria } })
        .then(result => {
            var questoes = result.map(i => i.dataValues.id);
            var questoesArray = [];
            while (questoesArray.length < qtdQuestoes) {
                randomQuestoes = questoes[Math.floor(Math.random() * questoes.length)];
                var found = questoesArray.find(function (element) {
                    return element == randomQuestoes;
                })
                if (found) {
                    console.log('Questão já existente');
                } else {
                    Provas_QuestoesController.cadastrarProvasQuestoes(idProva, randomQuestoes);
                    questoesArray.push(randomQuestoes);
                }
            };
            return;
        })
        .catch(error => {
            console.log(error);
        })
}

/*async function buscarProvas(req, res) {
    await Provas.findAll()
        .then(result => {
            result.map(i => console.log(i.dataValues));
            //return result;
        })
        .catch(error => {
            //return res.json(error);
        })
}*/

module.exports = {
    async cadastraProvas(req, res) {
        await Provas.create(req.body)
            .then(async result => {
                await questoes(req.body.qtdQuestoesPortugues, 'portugues', result.id);
                await questoes(req.body.qtdQuestoesMatematica, 'matematica', result.id);
                await questoes(req.body.qtdQuestoesInformatica, 'informatica', result.id);
                await questoes(req.body.qtdQuestoesConhecimentosGerais, 'conhecimentos', result.id);
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async token(req, res) {
        await Provas.findOne({ where: { token: req.body.token } })
            .then(result => {
                if (result != null) {
                    return res.json({ Erro: "Token já existente" })
                } else {
                    return res.json(result);
                }
            })
            .catch(error => {
                return res.json(error);
            })
    },
}