const connect = require("../connection");
const { Questoes, Provas_Questoes } = require("../../app/models");

module.exports = {
  async cadastraQuestao(req, res) {
    await Questoes.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        if (error.errors[0].message == "enunciado must be unique") {
          return res.json({ Erro: "Questão já existente" });
        } else {
          return res.json({ Erro: "Falha ao cadastrar questão" });
        }
      });
  },

  async deletarQuestaoCadastrada(req, res) {
    await Questoes.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        return res.json(error);
      })
  },

  async atualizarQuestaoCadastrada(req, res) {
    await Questoes.update(req.body, {
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        return res.json(error);
      })
  },

  async buscarQuestoes(req, res) {
    await Questoes.findAll({
      where: {
        id: req
      }
    })
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        return res.json(error);
      })
  },

  async buscarQuestoesCadastradas(req, res) {
    await Questoes.findAll()
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        return res.json(error);
      })
  },

  async buscarQuestaoDeletarQuestao(req, res) {
    await Questoes.findOne({
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
  }
};
