'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Application.init({
    job_id: DataTypes.INTEGER,
    user_id: DataTypes.STRING,
    status: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};