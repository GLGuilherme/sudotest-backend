const { Op } = require('sequelize');
const { Provas_Questoes, Questoes, Provas } = require("../../app/models");
const { buscarQuestoes } = require('./QuestoesController');
const Provas_QuestoesController = require('../controllers/Provas_QuestoesController');
//const { questoes } = require("../controllers/ProvasController");
Provas_Questoes.belongsTo(Questoes, { foreignKey: 'idQuestao' });
Questoes.hasMany(Provas_Questoes, { foreignKey: 'idQuestao' });
Provas_Questoes.belongsTo(Provas, { foreignKey: 'idProva' });
Provas.hasMany(Provas_Questoes, { foreignKey: 'idProva' });

async function teste(idProva, idQuestao, res) {
    let resultado;
    await Provas_Questoes.findOrCreate({
        where: {
            idProva: idProva,
            idQuestao: idQuestao
        }
    })
        .then(result => {
            resultado = result[1];
            return res.json(result[1])
        })
        .catch(error => {
            return res.json(error);
        })
    return resultado;
}

async function cadastrarProvaQuestao(idProva, idQuestao) {
    await Provas_Questoes.create({
        idProva: idProva,
        idQuestao: idQuestao,
    })
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
}

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
                    cadastrarProvaQuestao(idProva, randomQuestoes);
                    questoesArray.push(randomQuestoes);
                }
            };
            return;
        })
        .catch(error => {
            console.log(error);
        })
}

async function provaCreate(i, res) {
    await Provas.create({
        id: i.id,
        horaInicio: i.horaInicio,
        nomeProva: i.nomeProva,
        horaTermino: i.horaTermino,
        qtdQuestoesMatematica: i.qtdQuestoesMatematica,
        qtdQuestoesPortugues: i.qtdQuestoesPortugues,
        qtdQuestoesInformatica: i.qtdQuestoesInformatica,
        qtdQuestoesConhecimentosGerais: i.qtdQuestoesConhecimentosGerais,
        token: i.token,
        status: i.status,
        porcentagemAprovacao: i.porcentagemAprovacao,
        dataRealizacao: i.dataRealizacao,
        vagasDisponiveis: i.vagasDisponiveis,
        qtdAprovados: i.qtdAprovados,
        mediaGeral: i.mediaGeral,
    })
        .then(async result => {
            await questoes(i.qtdQuestoesPortugues, 'portugues', i.id);
            await questoes(i.qtdQuestoesMatematica, 'matematica', i.id);
            await questoes(i.qtdQuestoesInformatica, 'informatica', i.id);
            await questoes(i.qtdQuestoesConhecimentosGerais, 'conhecimentos', i.id);
        })
        .catch(error => {
        })
}


module.exports = {
    async  cadastrarProvasQuestoes(idProva, idQuestao) {
        await Provas_Questoes.create({
            idProva: idProva,
            idQuestao: idQuestao,
        })
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    },

    async buscarProvasQuestoes(req, res) {
        await Provas_Questoes.findAll({
            where: {
                idProva: req.query.idProva,
            }
        })
            .then(async result => {
                await buscarQuestoes(result.map(i => i.idQuestao), res);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async buscarTodasProvasQuestoes(req, res) {
        await Provas_Questoes.findAll({
            where: {
                idQuestao: req.query.idQuestao,
            },
            include: [{
                model: Questoes,
            }, {
                model: Provas,
                where: {
                    status: 'Aberta',
                }
            }],


        })
            .then(result => {
                let categoria = result[0].Questo.categoria;
                if (categoria === 'portugues') {
                    return res.json({
                        categoria: categoria,
                        provas: result.map(i => ({
                            idProva: i.Prova.id,
                            qtdQuestoes: i.Prova.qtdQuestoesPortugues
                        }))
                    })
                } else if (categoria === 'matematica') {
                    return res.json({
                        categoria: categoria,
                        provas: result.map(i => ({
                            idProva: i.Prova.id,
                            qtdQuestoes: i.Prova.qtdQuestoesMatematica
                        }))
                    })
                } else if (categoria === 'informatica') {
                    return res.json({
                        categoria: categoria,
                        provas: result.map(i => ({
                            idProva: i.Prova.id,
                            qtdQuestoes: i.Prova.qtdQuestoesInformatica
                        }))
                    })
                } else {
                    return res.json({
                        categoria: categoria,
                        provas: result.map(i => ({
                            idProva: i.Prova.id,
                            qtdQuestoes: i.Prova.qtdQuestoesConhecimentosGerais
                        }))
                    })
                }
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async deletarAtualizarProvasQuestoes(req, res) {
        await Provas_Questoes.findAll({
            where: {
                idQuestao: 24
            },
            include: [{
                model: Provas,
                where: {
                    status: 'Aberta'
                }
            }]
        })
            .then(async result => {
                let provas = result.map(i => i.Prova)
                await Provas.destroy({
                    where: {
                        id: provas.map(i => i.id)
                    }
                })
                    .then(async result => {
                        await provas.map(i => (provaCreate(i, res)))
                        return res.json(result);
                    })
                    .catch(error => {
                        return res.json(error);
                    })
            })
            .catch(error => {
                return res.json(error)
            })
            .catch(error => {
                return res.json(error);
            })
    },
};
