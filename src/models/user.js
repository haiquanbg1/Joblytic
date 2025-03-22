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

      User.hasMany(models.Message, {
        foreignKey: "sender_id",
        as: "sendMessage"
      });

      User.hasMany(models.Message, {
        foreignKey: "receiver_id",
        as: "receiveMessage"
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