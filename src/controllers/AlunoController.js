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


  async login(request, response) {
    const req = request.body
    let sql = 'SELECT email, senha FROM aluno WHERE email = $1 and senha = $2'
    let values = [
      req.email,
      req.senha
    ]

    await connect().query(sql, values, (error, results) => {
      if(error){
        throw error
      }

      if(results.rowCount == 1){
        return response.json({login: true});
      }else{
        return response.json({login: false});
      }
    })
  }
}
