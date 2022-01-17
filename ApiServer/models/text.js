'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Text extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Text.belongsTo(models.Session)
    }
  };
  Text.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Text',
  });
  return Text;
};