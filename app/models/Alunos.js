module.exports = (sequelize, DataTypes) => {
    const Alunos = sequelize.define('Alunos', {
      nome: DataTypes.STRING,
      email: DataTypes.STRING,
      senha: DataTypes.STRING,
      telefone: DataTypes.INTEGER,
      cpf: DataTypes.INTEGER,
      idade: DataTypes.INTEGER
    });
  
    return Alunos;
}