'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsToMany(models.Applicant, {
        through: 'ApplicantSkill',
        foreignKey: 'skill_id',
        otherKey: 'applicant_id',
        as: 'applicants'
      });
    }
  }
  Skill.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};