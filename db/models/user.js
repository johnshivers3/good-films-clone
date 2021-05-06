'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    emailAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false
    }
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Review, {foreignKey:'userId', onDelete:'cascade', hooks:true});
    User.hasMany(models.Collection, {foreignKey:'userId', onDelete:'cascade', hooks:true});
  };
  return User;
};