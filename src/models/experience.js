'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Experience.init({
    user_id: DataTypes.INTEGER,
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Experience',
  });
  return Experience;
};