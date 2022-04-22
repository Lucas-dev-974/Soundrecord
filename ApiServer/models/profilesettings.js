'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileSettings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ProfileSettings.init({
    userid: DataTypes.INTEGER,
    setting_name: DataTypes.STRING,
    setting_value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfileSettings',
  });
  return ProfileSettings;
};