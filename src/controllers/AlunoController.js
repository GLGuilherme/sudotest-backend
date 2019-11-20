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

    //const req = request.body;
    /*let sql = 'INSERT INTO aluno(nome, email, senha, telefone, cpf, idade) VALUES($1, $2, $3, $4, $5, $6);'
    
    let values = [
      req.nome,
      req.email,
      req.senha,
      req.telefone,
      req.cpf,
      req.idade
    ]

    await connect().query(sql, values, (error, results) => {
      if (error) {
        throw error
      } else {
        return response.json({ user: req.nome });
      }
    })*/
  },

  async login(req, res) {
    await Alunos.findOne({ where: { email: req.body.email, senha: req.body.senha } })
      .then(alunos => {
        if (!alunos) {
          return res.json({ login: false });
        } else {
          return res.json({ login: true });
        }
      })
      .catch(error => {
        return res.json({ Erro: "Falha ao efetuar login" });
      });

    //const req = request.body
    /*let sql = 'SELECT email, senha FROM "Alunos" WHERE email = $1 and senha = $2'
    let values = [
      req.body.email,
      req.body.senha
    ]*/

    /*await connect().query(sql, values, (error, results) => {
      if(error){
        throw error
      }

      if(results.rowCount == 1){
        return res.json({login: true});
      }else{
        return res.json({login: false});
      }
    })*/
  }
};
