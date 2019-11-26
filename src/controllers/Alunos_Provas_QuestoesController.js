const { Alunos_Provas_Questoes } = require("../../app/models");

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
    }
};
