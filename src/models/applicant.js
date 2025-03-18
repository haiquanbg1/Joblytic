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

      Applicant.hasMany(models.Message, {
        foreignKey: "applicant_id",
        as: "messages"
      })
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