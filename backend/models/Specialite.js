const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Specialite = sequelize.define('Specialite', {
  id_specialite: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  specialite_name: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'specialite',
  timestamps: false
});

module.exports = Specialite;