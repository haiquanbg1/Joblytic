'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaveJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SaveJob.belongsTo(models.Applicant, {
        foreignKey: "applicant_id",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "applicant"
      });

      SaveJob.belongsTo(models.Job, {
        foreignKey: "job_id",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: "job"
      });
    }
  }
  SaveJob.init({
    job_id: DataTypes.INTEGER,
    applicant_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SaveJob',
  });
  return SaveJob;
};