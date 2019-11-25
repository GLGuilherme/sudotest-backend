'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Alunos_Provas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idAluno: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Alunos',
          key: 'id'
        }
      },
      idProva: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Provas',
          key: 'id'
        }
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
    return queryInterface.dropTable('Alunos_Provas');
  }
};
