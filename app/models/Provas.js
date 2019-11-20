module.exports = (sequelize, DataTypes) => {
    const Provas = sequelize.define('Provas', {
      tempoExecucao: DataTypes.INTEGER,
      qtdMatematica: DataTypes.INTEGER,
      qtdPortugues: DataTypes.INTEGER,
      qtdInformatica: DataTypes.INTEGER,
      qtdConhecimentosGerais: DataTypes.INTEGER,
      token: DataTypes.STRING,
      status: DataTypes.STRING,
      porcentagemAprovacao: DataTypes.DOUBLE,
      dataRealizacao: DataTypes.DATE,
      qtdVagas: DataTypes.INTEGER,
      qtdAprovados: DataTypes.INTEGER,
      mediaGeral: DataTypes.DOUBLE
    });
  
    return Provas;
}