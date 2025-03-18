'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSkill.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'user'
      });

      UserSkill.belongsTo(models.Skill, {
        foreignKey: 'skill_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'skill'
      })
    }
  }
  UserSkill.init({
    user_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSkill',
    tableName: "userskills"
  });
  return UserSkill;
};