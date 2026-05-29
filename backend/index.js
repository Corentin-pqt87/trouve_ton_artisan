const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
const artisanRoutes = require('./routes/artisanRoutes'); // Votre fichier de routes
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

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


app.post('/api/contact', async (req, res) => {
  const { to, fromName, subject, message } = req.body;

  if (!to || !fromName || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: `[Trouve Ton Artisan] Nouveau message : ${subject}`,
    text: `Bonjour,\n\nVous avez reçu un nouveau message de la part de ${fromName} :\n\n"${message}"\n\nCordialement,\nL'équipe Trouve Ton Artisan`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    res.status(500).json({ error: "Échec de l'envoi de l'email." });
  }
});

// CORRECTION DU LISTEN : Ajout de PORT dynamique et de l'adresse '0.0.0.0' obligatoire pour Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Le serveur API Node.js écoute sur le port ${PORT}`);
});