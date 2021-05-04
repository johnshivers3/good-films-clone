'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Movies_Collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"Movies" ,
          key: "id"
        }
      },
      collectionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:"Collections" ,
          key:"id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Movies_Collections');
  }
};