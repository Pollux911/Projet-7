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
        /*references: {
          model: 'Comments',
          key: 'id',
        },*/
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
    /*await queryInterface.addColumn(
        'users', // name of Source model
        'userId', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'users', // name of Target model
            key: 'uuid', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    );
    await queryInterface.addColumn(
        'posts', // name of Source model
        'postId', // name of the key we're adding
        {
          type: Sequelize.UUID,
          references: {
            model: 'posts', // name of Target model
            key: 'uuid', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
    );*/
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Likes');
    /*await queryInterface.removeColumn(
        'Users', // name of Source model
        'userId' // key we want to remove
    );
    await queryInterface.removeColumn(
        'Posts', // name of Source model
        'postId' // key we want to remove
    );*/
  }

};