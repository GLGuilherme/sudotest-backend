const { Alunos_Provas, Alunos, Provas } = require("../../app/models");
Alunos_Provas.belongsTo(Alunos, {foreignKey: 'idAluno'});
Alunos.hasMany(Alunos_Provas, {foreignKey: 'idAluno'})
Alunos_Provas.belongsTo(Provas, {foreignKey: 'idProva'});
Provas.hasMany(Alunos_Provas, {foreignKey: 'idProva'})

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
                idAluno: req.query.idAluno,
            },
            include: [{
                model: Provas,
                order: [
                    ['dataRealizacao', 'DESC']
                ]
            }],
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
        await Alunos_Provas.findAll({
            where: {
                idProva: req.query.idProva,
            },
            attributes: ['idAluno', 'idProva', 'porcentagemMedia'],
            order: [
                ['porcentagemMedia', 'DESC'],
            ],
            include: [{
                model: Alunos,
                attributes: ['id', 'nome', 'email', 'telefone', 'cpf', 'idade']
            }]
        })
            .then(result => {
                return res.json(result);
            })
            .catch(error => {
                return res.json(error);
            })
    },
};
