module.exports = (sequelize, DataTypes) => {
    const Aluno_Prova_Questao = sequelize.define('Aluno_Prova_Questao', {
      idAluno: DataTypes.INTEGER,
      idProva: DataTypes.INTEGER,
      idQuestao: DataTypes.INTEGER,
      resposta: DataTypes.BOOLEAN,
      alternativaMarcada: DataTypes.STRING,
    });
  
    return Aluno_Prova_Questao;
  }