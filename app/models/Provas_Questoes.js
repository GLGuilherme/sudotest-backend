module.exports = (sequelize, DataTypes) => {
    const Provas_Questoes = sequelize.define('Provas_Questoes', {
      idProva: DataTypes.INTEGER,
      idQuestao: DataTypes.INTEGER,
    });
  
    return Provas_Questoes;
  }