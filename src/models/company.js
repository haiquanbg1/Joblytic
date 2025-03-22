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
      Company.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });

      Company.hasMany(models.Job, {
        foreignKey: "company_id",
        as: "jobs"
      });
    }
  }
  Company.init({
    user_id: DataTypes.INTEGER,
    website: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};