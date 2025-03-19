'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.Applicant, {
        foreignKey: "applicant_id",
        as: "applicant"
      });
    }
  }
  Education.init({
    applicant_id: DataTypes.INTEGER,
    school: DataTypes.STRING,
    major: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};