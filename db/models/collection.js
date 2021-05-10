'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define('Collection', {
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {});
  Collection.associate = function(models) {
    Collection.belongsTo(models.User, {foreignKey: "userId"});
    const columnMapping = {
      through: 'Movies_Collection',
      otherKey: 'movieId',
      foreignKey: 'collectionId',
      // onDelete: 'cascade',
      // hooks: true
     };
    Collection.belongsToMany(models.Movie, columnMapping);
    Collection.hasMany(models.Movies_Collection, {foreignKey: 'collectionId', onDelete: 'cascade', hooks: true})
  };
  return Collection;
};