'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    title:{ 
      type:DataTypes.STRING(100),
      allowNull: false,
    },
    directors: { 
      type:DataTypes.STRING(100),
      allowNull: false,
    },
    description: { 
      type:DataTypes.STRING,
      allowNull: false,
    },
    genre: { 
      type:DataTypes.STRING,
      allowNull: false,
    },
    actors:{ 
      type:DataTypes.STRING,
      allowNull: false,
    },
    releaseDate: {
      type:DataTypes.DATE,
      allowNull:false
    },
    image: {
      type:DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Movie.associate = function(models) {
   Movie.hasMany(models.Review, {foreignKey:'movieId'});
   const columnMapping = {
    through: 'Movies_Collection',
    otherKey: 'collectionId',
    foreignKey: 'movieId',
   };
   Movie.belongsToMany(models.Collection, columnMapping);
  };
  return Movie;
};