const connect = require("../connection");
const { Questoes, Provas_Questoes } = require("../../app/models");

module.exports = {
  async cadastraQuestao(req, res) {
    await Questoes.create(req.body)
      .then(result => {
        return res.json(result);
      })
      .catch(error => {
        if (error.errors[0].message == "email must be unique") {
          return res.json({ Erro: "Questão já existente" });
        } else {
          return res.json({ Erro: "Falha ao cadastrar questão" });
        }
      });
  },

  async deletarQuestao(req, res) {
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

  async atualizarQuestao(req, res) {
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
  }
};
