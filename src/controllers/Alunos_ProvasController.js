const { Alunos_Provas, Alunos } = require("../../app/models");

module.exports = {
    async cadastrarAlunosProvas(idAluno, idProva, porcentagemMedia, res) {
        await Alunos_Provas.create({
            idAluno,
            idProva,
            porcentagemMedia
        })
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
    },

    async validarAlunosProvas(req, res) {
        await Alunos_Provas.findOne({
            where: {
                idProva: req.query.idProva,
                idAluno: req.query.idAluno,
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async atualizarAlunoProva(req, res) {
        await Alunos_Provas.update(req.body, {
            where: {
                idAluno: req.body.idAluno,
                idProva: req.body.idProva,
            }
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },

    async gerarRelatorio(req, res) {
        await Alunos_Provas.findOne({
            where: {
                idAluno: req.query.idAluno,
                idProva: req.query.idProva,
            },
        })
            .then(async result => {
                let porcentagemMedia = result.porcentagemMedia;
                await Alunos.findOne({
                    where: {
                        id: req.query.idAluno
                    }
                })
                    .then(result => {
                        return res.json({
                            idAluno: result.id,
                            nome: result.nome,
                            email: result.email,
                            cpf: result.cpf,
                            telefone: result.telefone,
                            idade: result.idade,
                            porcentagemMedia: porcentagemMedia,
                        });
                    })
                    .catch(error => {
                        return res.json(error);
                    })
            })
            .catch(error => {
                return res.json(error);
            })
    },
};
