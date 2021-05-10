'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movies_Collection = sequelize.define('Movies_Collection', {
    movieId: {
      type:DataTypes.INTEGER
    },
    collectionId: {
      type:DataTypes.INTEGER
    },

  }, {});
  Movies_Collection.associate = function(models) {

  };
  return Movies_Collection;
};
