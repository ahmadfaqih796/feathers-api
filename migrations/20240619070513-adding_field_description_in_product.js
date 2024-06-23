"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("product");

    if (!table.description) {
      await queryInterface.addColumn("product", "description", {
        type: Sequelize.STRING,
        defaultValue: false,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("product");

    if (table.description) {
      await queryInterface.removeColumn("product", "description");
    }
  },
};
