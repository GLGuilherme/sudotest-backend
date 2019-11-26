module.exports = (sequelize, DataTypes) => {
    const Provas = sequelize.define('Provas', {
      horaInicio: DataTypes.TIME,
      nomeProva: DataTypes.STRING,
      horaTermino: DataTypes.TIME,
      qtdQuestoesMatematica: DataTypes.INTEGER,
      qtdQuestoesPortugues: DataTypes.INTEGER,
      qtdQuestoesInformatica: DataTypes.INTEGER,
      qtdQuestoesConhecimentosGerais: DataTypes.INTEGER,
      token: DataTypes.STRING,
      status: DataTypes.STRING,
      porcentagemAprovacao: DataTypes.DOUBLE,
      dataRealizacao: DataTypes.DATE,
      vagasDisponiveis: DataTypes.INTEGER,
      qtdAprovados: DataTypes.INTEGER,
      mediaGeral: DataTypes.DOUBLE
    });
  
    return Provas;
}