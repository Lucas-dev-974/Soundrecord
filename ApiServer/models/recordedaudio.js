'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecordedAudio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RecordedAudio.init({
    recorded_session: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RecordedAudio',
  });
  return RecordedAudio;
};