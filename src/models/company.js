'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    website: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};