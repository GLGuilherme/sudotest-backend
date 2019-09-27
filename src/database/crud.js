const connect = require("./connection");

const getUsers = (request, response) => {
  connect().query('create table ricardo(username varchar(50));', (error, results) => {
    if (error) {
      throw error
    }
    console.log(request.params.nome);
    
    response.status(200).json({ user: request.params.nome })
  })
}

module.exports = {getUsers};
