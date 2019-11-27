'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Provas_Questoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idProva: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Provas',
          key: 'id'
        }
      },
      idQuestao: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Questoes',
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
    return queryInterface.dropTable('Provas_Questoes');
  }
};
