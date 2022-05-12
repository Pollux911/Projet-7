'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'userId', as: 'commentUser'
      });
      Comment.belongsTo(models.Post, {
        foreignKey: 'postId', as: 'commentPost'
      });
      Comment.belongsToMany(models.User, {
        as: 'commentLike',
        through: models.Like,
        foreignKey: 'postId'
        //sourceKey: 'id', targetKey: 'id'
      });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
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
      references: {
        model: 'Posts',
        key: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    likes: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
    modelName: 'Comment',
  });
  return Comment;
};