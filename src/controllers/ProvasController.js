const {Provas} = require("../../app/models");

module.exports = {
    async cadastraProvas(req, res) {
        await Provas.create(req.body)
        .then(result => {
            return res.json(result);
        })
        .catch(error => {
            return res.json(error);
        })
    },

    async token(req, res) {
        await Provas.findOne({where: {token: req.body.token}})
        .then(result => {
            if (result != null) {
                return res.json({Erro: "Token já existente"})
            } else {
                return res.json(result);
            }
        })
        .catch(error => {
            return res.json(error);
        })
    }
}