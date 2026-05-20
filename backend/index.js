const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const artisanRoutes = require('./routes/artisanRoutes'); // Votre fichier de routes

const app = express(); // <--- C'EST CETTE LIGNE QUI MANQUAIT !
const PORT = 5000;

// autoriser React (3000) à communiquer avec l'API
app.use(cors());

// permettre a Express de lire le format JSON
app.use(express.json());

// connexion a la base de données MySQL
connectDB();
sequelize.sync({ force: false })
  .then(() => console.log('Tables MySQL connectées et prêtes.'))
  .catch((err) => console.error('Erreur de synchro des tables :', err));

// utilisation des routes de l'API pour les artisans
app.use(artisanRoutes);

// lancer le serveur d'API 
app.listen(PORT, () => {
  console.log(`Le serveur API Node.js écoute sur le port ${PORT}`);
});