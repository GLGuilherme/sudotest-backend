'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Provas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      horaInicio: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      horaTermino: {
        allowNull: false,
        type: DataTypes.TIME,
      },
      nomeProva: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      qtdQuestoesMatematica: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdQuestoesPortugues: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdQuestoesInformatica: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdQuestoesConhecimentosGerais: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      porcentagemAprovacao: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      dataRealizacao: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
      vagasDisponiveis: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdAprovados: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      mediaGeral: {
        allowNull: true,
        type: DataTypes.DOUBLE
      },
      token: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Provas');
  }
};
