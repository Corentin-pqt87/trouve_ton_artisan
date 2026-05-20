const { Sequelize } = require('sequelize');
// lecture du fichier .env
require('dotenv').config();

// Initialisation de Sequelize configuré pour MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // nom de la base de données
  process.env.DB_USER, // utilisateur de la base de données
  process.env.DB_PASSWORD, // mot de passe de la base de données
  {
    host: process.env.DB_HOST, // hôte de la base de données
    port: process.env.DB_PORT, // port de la base de données
    dialect: 'mysql', // type de base de données
    logging: false, // désactiver les logs SQL pour une meilleure lisibilité
    define: {
      timestamps: false, // désactiver les timestamps automatiques (createdAt, updatedAt)
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('--- Connexion au serveur MySQL réussie ! ---');
  } catch (error) {
    console.error('Erreur de connexion à MySQL :', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };