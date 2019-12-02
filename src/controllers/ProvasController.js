const { Provas, Questoes, Alunos_Provas } = require("../../app/models");
const Provas_QuestoesController = require('../controllers/Provas_QuestoesController');
const { Op } = require('sequelize')
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

async function provasCreate(req, res) {
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
}

module.exports = { questoes };

module.exports = {
    async cadastraProvas(req, res) {
        provasCreate(req, res);
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

    async buscarToken(req, res) {
        await Provas.findOne({
            where: {
                token: req.query.token,
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async atualizarProva(req, res) {
        await Provas.destroy({
            where: {
                id: req.body.id,
            },
        })
            .then(async result => {
                await provasCreate(req, res);
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    },

    async deletarProva(req, res) {
        await Provas.destroy({
            where: {
                id: req.body.id,
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async buscarProvas(req, res) {
        await Provas.findAll({
            where: {
                status: req.query.status
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async buscarProvasDeletarQuestoes(req, res) {
        await Provas.findAll({
            where: {
                id: req.query.idProva,
                status: req.query.status,
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async encerrarProva(req, res) {
        await Provas.findAndCountAll({
            where: {
                id: req.body.id
            },
            include: [{
                model: Alunos_Provas
            }]
        })
            .then(async result => {
                let qtdTotal = result.count;
                await Provas.findAndCountAll({
                    where: {
                        id: req.body.id
                    },
                    include: [{
                        model: Alunos_Provas,
                        where: {
                            porcentagemMedia: {
                                [Op.gte]: result.rows.map(i => i.porcentagemAprovacao)
                            }
                        }
                    }]
                })
                    .then(async result => {
                        let qtdAprovados = result.count;
                        await Alunos_Provas.sum('porcentagemMedia', {
                            where: {
                                idProva: req.body.id
                            }
                        })
                            .then(async sum => {
                                let mediaGeral = parseFloat(sum) / parseFloat(qtdTotal);
                                await Provas.update({
                                    qtdAprovados: qtdAprovados,
                                    mediaGeral: mediaGeral,
                                    status: 'Encerrada'
                                },{
                                    where: {
                                        id: req.body.id
                                    },
                                })
                                    .then(result => {
                                        return res.json(result);
                                    })
                                    .catch(error => {
                                        return res.json(error);
                                    })
                            })
                            .catch(error => {
                                return res.json(error);
                            })
                    })
                    .catch(error => {
                        return res.json(error);
                    })
            })
            .catch(error => {
                return res.json(error)
            })
    }
}