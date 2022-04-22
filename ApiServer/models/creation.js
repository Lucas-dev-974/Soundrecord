'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Creation.belongsTo(models.Session)
      models.Creation.belongsTo(models.User)
    }
  };
  Creation.init({
    sessionid: DataTypes.INTEGER,
    userid:    DataTypes.INTEGER,
    name:      DataTypes.STRING,
    path:      DataTypes.STRING,
    public:    DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Creation',
  });
  return Creation;
};