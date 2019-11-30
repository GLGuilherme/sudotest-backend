const { Op } = require('sequelize');
const { Provas_Questoes, Questoes, Provas } = require("../../app/models");
const { buscarQuestoes } = require('./QuestoesController');
Provas_Questoes.belongsTo(Questoes, { foreignKey: 'idQuestao' });
Questoes.hasMany(Provas_Questoes, { foreignKey: 'idQuestao' });
Provas_Questoes.belongsTo(Provas, { foreignKey: 'idProva' });
Provas.hasMany(Provas_Questoes, { foreignKey: 'idProva' });
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
        /*await Questoes.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(async result => {*/
        await Questoes.findAll({
            where: {
                categoria: 'portugues',
            },
            include: [{
                model: Provas_Questoes,
                where: {
                    idProva: {
                        [Op.in]: [5, 26, 4]
                    }
                }
            }]
        })
            .then(async result => {
                //return res.json(result);
                var questoes = await result.map(i => i.id);
                //return res.json(questoes)
                var questoesArray = await result.map(i => ({
                    idQuestao: i.id,
                    Provas_Questoes: i.Provas_Questoes.map(i => ({
                        idProva: i.idProva
                    })),
                    //idQuestao: i.Provas_Questoes.map(i => i.idQuestao)
                }));
                randomQuestoes = await questoes[Math.floor(Math.random() * questoes.length)];
                var found = questoesArray.map(i => i.Provas_Questoes.map(i => i.idQuestao)).find(function (element) {
                    return element == randomQuestoes;
                })
                console.log(found);
                return res.json(questoesArray);
            })
            .catch(error => {
                return res.json(error);
            })
        //})
        /*.catch(error => {
            return res.json(error);
        })*/
    }
};
