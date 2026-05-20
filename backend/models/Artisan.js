const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

//Nom,Spécialité,Note,Ville,A propos,Email,Site Web,Catégorie,Top
const Artisan = sequelize.define('Artisan', {
  id_artisan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  note: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  a_propos: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  site_web: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  top_artisan: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0
  }
}, {
  tableName: 'artisan',
  timestamps: false
});

module.exports = Artisan;