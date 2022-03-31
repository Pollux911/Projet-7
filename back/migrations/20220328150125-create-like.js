'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      /*idUSERS: {
        allowNull: false,
        type: DataTypes.INTEGER,
        /!*references: {
          model: User,
          key: 'uuid'
        }*!/
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Likes');
  }
};