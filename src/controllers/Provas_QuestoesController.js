const { Op } = require('sequelize');
const { Provas_Questoes, Questoes, Provas } = require("../../app/models");
const { buscarQuestoes } = require('./QuestoesController');
const { questoes } = require("../controllers/ProvasController");
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

async function provaCreate(provas) {
    i = 0;

    while (i < provas.length) {
        await Provas.create({
            id: provas[i].id,
            horaInicio: provas[i].horaInicio,
            nomeProva: provas[i].nomeProva,
            horaTermino: provas[i].horaTermino,
            qtdQuestoesMatematica: provas[i].qtdQuestoesMatematica,
            qtdQuestoesPortugues: provas[i].qtdQuestoesPortugues,
            qtdQuestoesInformatica: provas[i].qtdQuestoesInformatica,
            qtdQuestoesConhecimentosGerais: provas[i].qtdQuestoesConhecimentosGerais,
            token: provas[i].token,
            status: provas[i].status,
            porcentagemAprovacao: provas[i].porcentagemAprovacao,
            dataRealizacao: provas[i].dataRealizacao,
            vagasDisponiveis: provas[i].vagasDisponiveis,
            qtdAprovados: provas[i].qtdAprovados,
            mediaGeral: provas[i].mediaGeral,
        })
            .then(async result => {
                await questoes(provas[i].qtdQuestoesPortugues, 'portugues', provas[i].id);
                await questoes(provas[i].qtdQuestoesMatematica, 'matematica', provas[i].id);
                await questoes(provas[i].qtdQuestoesInformatica, 'informatica', provas[i].id);
                await questoes(provas[i].qtdQuestoesConhecimentosGerais, 'conhecimentos', provas[i].id);
                i++;
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    }
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
                idQuestao: 6
            },
            include: [{
                model: Provas
            }]
        })
            .then(async result => {
                let provas = result.map(i => i.Prova)
                //return res.json(provas);
                await Provas.destroy({
                    where: {
                        id: provas.map(i => i.id)
                    }
                })
                    .then(async result => {
                        provaCreate(provas);
                    })
                    .catch(error => {
                        return res.json(error);
                    })
                /*await Questoes.findAll({
                    where: {
                        categoria: 'portugues'
                    }
                })
                    .then(async result => {
                        let questoes = await result.map(i => i.id);*/
                //return res.json(result)
                //await provas.map(async element => {
                //let tamanho = 0;
                /*let i = 0;
                tamanho = 0;
                while (i <= provas.length) {
                    let randomQuestoes = await questoes[Math.floor(Math.random() * questoes.length)];
                    console.log(provas[i], randomQuestoes)
                    await Provas_Questoes.findOrCreate({
                        where: {
                            idProva: provas[i],
                            idQuestao: randomQuestoes
                        }
                    })
                        .then(result => {
                            if (result[1] === false) {
                                tamanho++
                                console.log('false')
                            } else {
                                i++;
                                console.log('true')
                            }
                            //return res.json(result[1])
                        })
                        .catch(error => {
                            //return res.json(error);
                        })*/

                /*console.log(element, randomQuestoes)
                
                if (await teste(element, randomQuestoes) === false) {
                    console.log('1');
                    tamanho++;
                } else {
                    console.log('2');
                }*/
                //}
                //});
                /*await provas.forEach(async element => {
                    let tamanho = 0;
                    while (await tamanho < questoes.length) {
                        let randomQuestoes = await questoes[Math.floor(Math.random() * questoes.length)];
                        console.log(element, randomQuestoes)
                        await Provas_Questoes.findOrCreate({
                            where: {
                                idProva: element,
                                idQuestao: randomQuestoes
                            }
                        })
                            .then(result => {
                                if (result[1] === false) {
                                    tamanho++;
                                    console.log('false')
                                } else {
                                    console.log('true')
                                }
                                //return res.json(result[1])
                            })
                            .catch(error => {
                                //return res.json(error);
                            })*/

                /*console.log(element, randomQuestoes)
                
                if (await teste(element, randomQuestoes) === false) {
                    console.log('1');
                    tamanho++;
                } else {
                    console.log('2');
                }*/
                //}
                //});
                //return res.json(questoes)
            })
            .catch(error => {
                return res.json(error)
            })
            //return res.json(provas)
            .catch(error => {
                return res.json(error);
            })
        /*await Questoes.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(async result => {*/
        /*await Questoes.findAll({
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
        })*/
        /*.then(async result => {
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
    //})*/
        /*.catch(error => {
            return res.json(error);
        })*/
    },

    /*async randomQuestoes(questoes) {
        return await questoes[Math.floor(Math.random() * questoes.length)];
    }*/
};
