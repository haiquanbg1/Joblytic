'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category'
      });

      Job.belongsToMany(models.Applicant, {
        through: 'SaveJob',
        foreignKey: 'job_id',
        otherKey: 'applicant_id',
        as: 'applicants'
      });

      Job.belongsTo(models.Company, {
        foreignKey: 'company_id',
        as: 'company'
      });

      Job.hasMany(models.Application, {
        foreignKey: "job_id",
        as: "applications"
      });
    }
  }
  Job.init({
    company_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    salary: DataTypes.STRING,
    location: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    type: DataTypes.ENUM('Full-time', 'Part-time', 'Freelance'),
    createdAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};