'use strict';

const { UserSchema, USER_TABLE } = require("../model/user.model")
const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  async down (queryInterface, sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
