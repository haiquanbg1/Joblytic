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
      Application.belongsTo(models.Applicant, {
        foreignKey: "applicant_id",
        as: "applicant"
      });

      Application.belongsTo(models.Job, {
        foreignKey: "job_id",
        as: "job"
      });
    }
  }
  Application.init({
    job_id: DataTypes.INTEGER,
    applicant_id: DataTypes.STRING,
    status: DataTypes.ENUM('Pending', 'Accepted', 'Rejected')
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};