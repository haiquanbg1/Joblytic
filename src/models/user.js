'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Skill, {
        through: 'UserSkill',
        foreignKey: 'user_id',
        otherKey: 'skill_id',
        as: 'skills'
      });

      User.belongsToMany(models.Job, {
        through: 'SaveJob',
        foreignKey: 'user_id',
        otherKey: 'job_id',
        as: 'jobs'
      });

      User.hasOne(models.Applicant, {
        foreignKey: 'user_id',
        as: 'applicant'
      });

      User.hasOne(models.Company, {
        foreignKey: 'user_id',
        as: 'company'
      });

      User.hasMany(models.Experience, {
        foreignKey: 'user_id',
        as: 'experiences'
      });

      User.hasMany(models.Application, {
        foreignKey: "user_id",
        as: "applications"
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.ENUM('applicant', 'recruiter'),
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};