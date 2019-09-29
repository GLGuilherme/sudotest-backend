const connect = require("../connection");

module.exports = {
  async cadastraAluno(request, response) {
    const req = request.body;
    
    let sql = 'INSERT INTO aluno(nome, email, senha, telefone, cpf, idade) VALUES($1, $2, $3, $4, $5, $6);'
    
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
    })
  },


  login(req, res) {
    return res.json({ login: true });
  }
}
