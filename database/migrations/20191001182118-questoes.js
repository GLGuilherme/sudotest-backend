module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Questoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      enunciado: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      alternativa1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      alternativa2: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      alternativa3: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      alternativa4: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      alternativa5: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      alternativacorreta: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      categoria: {
        allowNull: false,
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

  down: (queryInterface) => {
    return queryInterface.dropTable('Questoes');
  }
};