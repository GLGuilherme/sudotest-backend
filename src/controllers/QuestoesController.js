const connect = require("../connection");
const { Questoes } = require("../../app/models");

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

    /*const req = request.body
        let sql = 'INSERT INTO questoes(enunciado, alternativa1, alternativa2, alternativa3, alternativa4, alternativa5, alternativacorreta, categoria) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'

        let values = [
            req.enunciado,
            req.alternativa1,
            req.alternativa2,
            req.alternativa3,
            req.alternativa4,
            req.alternativa5,
            req.alternativacorreta,
            req.categoria
        ]

        await connect().query(sql, values, (error, results) => {
            if (error){
                throw(error)
            }else{
                return response.json({questao: true})
            }
        })*/
  }
};
