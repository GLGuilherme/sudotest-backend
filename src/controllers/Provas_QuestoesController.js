const { Provas_Questoes } = require("../../app/models");
const { buscarQuestoes } = require('./QuestoesController');

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
            }
        })
            .then(result => {
                return res.json(result.map(idProva => idProva.idProva));
            })
            .catch(error => {
                return res.json(error);
            })
    }
};
