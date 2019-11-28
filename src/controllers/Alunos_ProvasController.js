const { Alunos_Provas } = require("../../app/models");

module.exports = {
    async cadastrarAlunosProvas(req, res) {
        await Alunos_Provas.create(req.body)
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            });
    },

    async buscarAlunosProvas(req, res) {
        await Alunos_Provas.findAll({
            where: {
                idProva: req.query.idProva,
            },
            order: [
                ['porcentagemMedia', 'DESC'],
            ]
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    }
};
