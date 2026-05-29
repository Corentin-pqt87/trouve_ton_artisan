const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configuration du transporteur d'email (Exemple avec Gmail)
// Vous pouvez remplacer par votre propre fournisseur SMTP (Aiven, SendGrid, Mailtrap...)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Votre adresse email (ex: projet.artisan@gmail.com)
    pass: process.env.EMAIL_PASS  // Votre mot de passe d'application généré par Google
  }
});

// Route POST pour recevoir le formulaire de contact
router.post('/api/contact', async (req, res) => {
  const { to, fromName, subject, message } = req.body;

  // Validation rapide des données reçues
  if (!to || !fromName || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  // Contenu de l'email qui sera envoyé à l'artisan
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to, // L'email de l'artisan reçu depuis le frontend
    subject: `[Trouve Ton Artisan] Nouveau message : ${subject}`,
    text: `Bonjour,\n\nVous avez reçu un nouveau message de la part de ${fromName} :\n\n"${message}"\n\nCordialement,\nL'équipe Trouve Ton Artisan`,
  };

  try {
    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur Nodemailer :", error);
    res.status(500).json({ error: "Échec de l'envoi de l'email." });
  }
});

module.exports = router;