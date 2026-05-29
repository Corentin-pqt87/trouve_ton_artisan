const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const artisanRoutes = require('./routes/artisanRoutes'); // Votre fichier de routes

const app = express(); 

// CORRECTION DU PORT : Utiliser celui fourni dynamiquement par Render, ou 5000 en local
const PORT = process.env.PORT || 5000;

// autoriser toutes les origines (notamment votre site Vercel) à communiquer avec l'API
app.use(cors({ origin: '*' }));

// permettre a Express de lire le format JSON
app.use(express.json());

// connexion a la base de données MySQL
connectDB();
sequelize.sync({ force: false })
  .then(() => console.log('Tables MySQL connectées et prêtes.'))
  .catch((err) => console.error('Erreur de synchro des tables :', err));

// utilisation des routes de l'API pour les artisans
app.use(artisanRoutes);

// CORRECTION DU LISTEN : Ajout de PORT dynamique et de l'adresse '0.0.0.0' obligatoire pour Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Le serveur API Node.js écoute sur le port ${PORT}`);
});