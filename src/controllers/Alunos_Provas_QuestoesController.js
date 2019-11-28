const { Alunos_Provas_Questoes, Alunos_Provas } = require("../../app/models");
const { cadastrarAlunosProvas } = require("../controllers/Alunos_ProvasController");

module.exports = {
    async cadastrarAlunosProvasQuestoes(req, res) {
        await Alunos_Provas_Questoes.create(req.body)
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            });
    },

    async buscarAlunosProvasQuestoes(req, res) {
        await Alunos_Provas_Questoes.findOne({
            where: {
                idAluno: req.query.idAluno,
                idProva: req.query.idProva,
                idQuestao: req.query.idQuestao
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async atualizarAlunosProvasQuestoes(req, res) {
        await Alunos_Provas_Questoes.update(req.body, {
            where: {
                idAluno: req.body.idAluno,
                idProva: req.body.idProva,
                idQuestao: req.body.idQuestao
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async calcularMedia(req, res) {
        await Alunos_Provas.findOne({
            where: {
                idProva: req.query.idProva,
                idAluno: req.query.idAluno,
            }
        })
            .then(async result => {
                if (result === null) {
                    await Alunos_Provas_Questoes.findAndCountAll({
                        where: {
                            idAluno: req.query.idAluno,
                            idProva: req.query.idProva
                        }
                    })
                        .then(async result => {
                            let qtdQuestoes = result.count;
                            await Alunos_Provas_Questoes.findAndCountAll({
                                where: {
                                    idAluno: req.query.idAluno,
                                    idProva: req.query.idProva,
                                    resposta: 'correta'
                                }
                            })
                                .then(async result => {
                                    let media = parseFloat(result.count * 100) / parseFloat(qtdQuestoes);
                                    await cadastrarAlunosProvas(req.query.idAluno, req.query.idProva, media.toFixed(2), res);
                                })
                                .catch(error => {
                                    return res.json(error);
                                })
                        })
                        .catch(error => {
                            return res.json(error);
                        })
                } else {
                    return res.json({Erro: 'Já fez a prova'});
                }
            })
            .catch(error => {
                return res.json(error);
            })
    },
};
