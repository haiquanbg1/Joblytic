'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplicantSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApplicantSkill.belongsTo(models.Applicant, {
        foreignKey: 'applicant_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'applicant'
      });

      ApplicantSkill.belongsTo(models.Skill, {
        foreignKey: 'skill_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'skill'
      })
    }
  }
  ApplicantSkill.init({
    applicant_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ApplicantSkill',
    tableName: "applicantskills"
  });
  return ApplicantSkill;
};