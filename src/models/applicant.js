'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Applicant.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      Applicant.hasMany(models.Experience, {
        foreignKey: 'applicant_id',
        as: 'experiences'
      });

      Applicant.hasMany(models.Application, {
        foreignKey: "applicant_id",
        as: "applications"
      });

      Applicant.hasMany(models.Education, {
        foreignKey: "applicant_id",
        as: "educations"
      });

      Applicant.belongsToMany(models.Skill, {
        through: 'ApplicantSkill',
        foreignKey: 'applicant_id',
        otherKey: 'skill_id',
        as: 'skills'
      });

      Applicant.belongsToMany(models.Job, {
        through: 'SaveJob',
        foreignKey: 'applicant_id',
        otherKey: 'Job_id',
        as: 'Jobs'
      });
    }
  }
  Applicant.init({
    user_id: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    location: DataTypes.STRING,
    github: DataTypes.STRING,
    facebook: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    birthday: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Applicant',
  });
  return Applicant;
};