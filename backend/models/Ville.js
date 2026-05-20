const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Ville = sequelize.define('Ville', {
  id_ville: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ville_name: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'ville',
  timestamps: false
});

module.exports = Ville;