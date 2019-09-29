const connect = require("./connection");

const cadastraAluno = (request, response) => {
  const req = request.query;
  let sql = 'INSERT INTO aluno(nome, email, senha, telefone, cpf, idade) VALUES($1, $2, $3, $4, $5, $6);'
  let values = [req.nome, req.email, req.senha, req.telefone, req.cpf, req.idade]
  connect().query(sql, values, (error, results) => {
    if (error) {
      throw error
    }
    //response.status(200).json({ user: request.nome })
    console.log('Cadastrado com Sucesso', request.query);
  })
}
module.exports = {cadastraAluno};