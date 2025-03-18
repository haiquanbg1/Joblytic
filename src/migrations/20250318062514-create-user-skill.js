'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserSkills', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      skill_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Skills',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserSkills');
  }
};