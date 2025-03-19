'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      job_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Jobs',
          key: 'id'
        }
      },
      applicant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Applicants',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Accepted', 'Rejected')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Applications');
  }
};