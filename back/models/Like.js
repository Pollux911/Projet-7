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
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    postId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
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