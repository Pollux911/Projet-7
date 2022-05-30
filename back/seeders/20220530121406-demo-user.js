'use strict';
const bcrypt = require("bcrypt");
const password = 'admin';
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [{
      id: 123,
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@admin.com' ,
      password: await bcrypt.hash(password, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: true
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
}
