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
    static associate(models) {
      // define association here
      Like.belongsTo(models.User, {
         foreignKey: 'userId', as: 'likeUser'
       });
       Like.belongsTo(models.Post, {
         foreignKey: 'postId', as: 'likePost'
       });
    }
  }
  Like.init({
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    postId: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Posts',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    like: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};