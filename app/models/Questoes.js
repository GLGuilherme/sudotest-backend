module.exports = (sequelize, DataTypes) => {
    const Questoes = sequelize.define('Questoes', {
      enunciado: DataTypes.STRING,
      alternativa1: DataTypes.STRING,
      alternativa2: DataTypes.STRING,
      alternativa3: DataTypes.STRING,
      alternativa4: DataTypes.STRING,
      alternativa5: DataTypes.STRING,
      alternativacorreta: DataTypes.STRING,
      categoria: DataTypes.STRING,
    });
  
    return Questoes;
}