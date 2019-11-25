const { Provas_Questoes } = require("../../app/models");

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
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    }
};
