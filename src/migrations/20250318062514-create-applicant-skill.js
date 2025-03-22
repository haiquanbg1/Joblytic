'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApplicantSkills', {
      applicant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Applicants',
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
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.destroyTable('ApplicantSkills');
  }
};