'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(User, Post) {
      // define association here

    }
  }
  Like.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    /*idUSERS: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: users,
        key: 'uuid'
      }
    },
    idPOSTS: {
      allowNull: false,
      type: DataTypes.INTEGER,
      /!*references: {
        model: Post,
        key: 'uuid'
      }*!/
    },*/
    like: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};