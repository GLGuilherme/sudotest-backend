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
      tempoExecucao: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdMatematica: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdPortugues: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdInformatica: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      qtdConhecimentosGerais: {
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
      qtdVagas: {
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
