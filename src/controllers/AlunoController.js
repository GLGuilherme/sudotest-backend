const connect = require("../connection");
const { Alunos } = require("../../app/models");

module.exports = {
  async cadastraAluno(req, res) {
    await Alunos.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        if (error.errors[0].message == "email must be unique") {
          return res.json({ Erro: "Email já cadastrado" });
        } else if (error.errors[0].message == "cpf must be unique") {
          return res.json({ Erro: "CPF já cadastrado" });
        } else {
          return res.json({ Erro: "Falha ao cadastrar" });
        }
      });
  },

  async buscarAluno(req, res) {
    await Alunos.findOne({
      where: {
        id: req.query.id
      }
    })
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        return res.json(error);
      })
  },

  async login(req, res) {
    await Alunos.findOne({ where: { email: req.body.email, senha: req.body.senha } })
      .then(alunos => {
        if (!alunos) {
          return res.json({ login: false });
        } else {
          return res.json({ login: true, idAluno: alunos.id, nomeAluno: alunos.nome });
        }
      })
      .catch(error => {
        return res.json(error);
        return res.json({ Erro: "Falha ao efetuar login" });
      });
  },

  async buscarAlunosCadastrados(req, res) {
    await Alunos.findAll()
      .then(result => {
        return res.json(result);
      })
      .error(error => {
        return res.json(error);
      })
  }
};
