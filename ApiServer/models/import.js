'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Import.belongsTo(models.User, { 
        foreignKey: {
          allowNull: false
        }
      })

      models.Import.belongsTo(models.ImportedInProject, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  };
  Import.init({
    user: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Import',
  });
  return Import;
};