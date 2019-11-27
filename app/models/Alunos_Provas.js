module.exports = (sequelize, DataTypes) => {
  const Alunos_Provas = sequelize.define('Alunos_Provas', {
    idAluno: DataTypes.INTEGER,
    idProva: DataTypes.INTEGER,
    porcentagemMedia: DataTypes.DOUBLE,
  });

  return Alunos_Provas;
}