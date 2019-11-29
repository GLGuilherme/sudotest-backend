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
        await Alunos_Provas.findOrCreate({
            where: {
                idProva: req.query.idProva,
                idAluno: req.query.idAluno,
            },
            defaults: {
                porcentagemMedia: req.query.porcentagemMedia,
            }
        })
            .then(async result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },
};
