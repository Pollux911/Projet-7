'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'userId', as: 'posts'
      });
      User.belongsToMany(models.Post, {
        as:'userLike',
        through: models.Like,
        sourceKey: 'id', targetKey: 'id'
      });
      User.belongsToMany(models.Post, {
        as:'userComment',
        through: models.Comment,
        sourceKey: 'id', targetKey: 'id'
      });
      User.belongsToMany(models.Comment, {
        as:'userLikeComment',
        through: models.Like,
        sourceKey: 'id', foreignKey: 'postId'
      });

    }
    toJSON() {
      return { ...this.get(), password: undefined }
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isAdmin: {
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
    modelName: 'User',
  });
  return User;
};
