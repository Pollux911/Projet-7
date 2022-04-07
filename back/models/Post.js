'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'userId', as: 'user'
      });
      this.belongsToMany(User, { as: 'commentpost', through: 'comments' /*sourceKey: 'uuid', targetKey: 'uuid',*/});
      this.belongsToMany(User, { through: 'likes',/* sourceKey: 'uuid', targetKey: 'uuid',*/  as: 'postLike'})
    }
    toJSON(){
      return { ...this.get(), id: undefined, userId: undefined }
    }
  }
  Post.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    attachement: {
      allowNull: true,
      type: DataTypes.STRING
    },
    likes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};