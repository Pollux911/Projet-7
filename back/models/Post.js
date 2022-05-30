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
    static associate(models) {
      // define association here
      //Post.belongsToMany(User, { /*as: 'postlike',*/ through:  'UserPost', sourceKey: User.uuid, targetKey: Post.uuid})
      Post.belongsTo(models.User, {
        foreignKey: 'userId', as: 'users'
      })
      Post.belongsToMany(models.User, {
        as: 'postLike',
        through: models.Like,
        /*sourceKey: 'id', targetKey: 'id'*/
      });
      Post.belongsToMany(models.User, {
        as: 'postComment',
        through: models.Comment,
        /*sourceKey: 'id', targetKey: 'id'*/
      });
      Post.hasMany(models.Comment, {
        foreignKey: 'postId', as: 'postComments'
      })

    }
    /*toJSON(){
      return { ...this.get() }
    }*/
  }
  /*Post.associate = function (models) {


  };*/
  Post.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    attachment: {
      allowNull: true,
      type: DataTypes.STRING
    },
    likes: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
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
    modelName: 'Post',
  });
  return Post;
};