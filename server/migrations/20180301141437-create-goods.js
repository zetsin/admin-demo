module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('goods', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      size: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      // charset: 'utf8'
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('goods')
  }
}
