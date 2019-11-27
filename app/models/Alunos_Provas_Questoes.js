module.exports = (sequelize, DataTypes) => {
    const Alunos_Provas_Questoes = sequelize.define('Alunos_Provas_Questoes', {
      idAluno: DataTypes.INTEGER,
      idProva: DataTypes.INTEGER,
      idQuestao: DataTypes.INTEGER,
      resposta: DataTypes.STRING,
      alternativaMarcada: DataTypes.STRING,
    });
  
    return Alunos_Provas_Questoes;
  }