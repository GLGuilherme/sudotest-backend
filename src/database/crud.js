const connect = require("./connection");

/*function cadastrarAluno() {
  connect().query("select * from aluno", (err, res) => {
    console.log(err, res);
    connect().end();
  });
}*/

const getUsers = (request, response) => {
  connect().query('select * from aluno', (error, results) => {
    if (error) {
      throw error
    }
    //console.log(error, results);
    //console.log(request.params.nome);
    console.log('oi')
    
    // response.status(200).json(results.rows)
    response.status(200).json( 'certo')
    console.log(results);
    
  })
}

module.exports = {getUsers};
