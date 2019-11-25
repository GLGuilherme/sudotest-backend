module.exports = (sequelize, DataTypes) => {
  const Aluno_Prova = sequelize.define('Aluno_Prova', {
    idAluno: DataTypes.INTEGER,
    idProva: DataTypes.INTEGER,
  });

  return Aluno_Prova;
}