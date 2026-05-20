const express = require('express');
const router = express.Router();
// On importe nos modèles interconnectés
const { Artisan, Ville, Categorie, Specialite } = require('../models');

// Route pour récupérer tous les artisans avec leurs détails
router.get('/api/artisans', async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      // L'option include permet de joindre les tables interconnectées
      include: [
        { model: Ville, attributes: ['ville_name'] },
        { model: Categorie, attributes: ['categorie_name'] },
        { model: Specialite, attributes: ['specialite_name'] }
      ]
    });

    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération", details: error.message });
  }
});

// Route pour récupérer un artisan précis par son ID
router.get('/api/artisans/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [Ville, Categorie, Specialite] // Inclus toutes les infos par défaut
    });

    if (!artisan) {
      return res.status(404).json({ message: "Artisan introuvable" });
    }

    res.json(artisan);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;