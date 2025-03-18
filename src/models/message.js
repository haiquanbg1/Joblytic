'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Applicant, {
        foreignKey: "applicant_id",
        as: "applicant"
      });

      Message.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company"
      });
    }
  }
  Message.init({
    applicant_id: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};