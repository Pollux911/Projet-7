'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
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
        type: Sequelize.UUID,
        primaryKey: true,
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      like: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
  }

};