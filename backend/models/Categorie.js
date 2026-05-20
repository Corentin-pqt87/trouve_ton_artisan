const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Categorie = sequelize.define('Categorie', {
  id_categorie: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categorie_name: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'categorie',
  timestamps: false
});

module.exports = Categorie;