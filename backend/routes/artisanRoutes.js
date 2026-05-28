const express = require('express');
const router = express.Router();

const { Artisan, Ville, Categorie, Specialite } = require('../models');
const { Op } = require('sequelize');

// Route pour récupérer tous les artisans avec leurs détails
router.get('/api/artisans', async (req, res) => {
  try {
    const { id_categorie, nom, villes, specialites } = req.query;
    
    let conditions = {};

    if (id_categorie) {
      conditions.id_categorie = id_categorie;
    }

    if (nom) {
      conditions.nom = {
        [Op.like]: `%${nom}%`
      };
    }

    if (villes && villes.trim() !== "" && villes !== "undefined") {
      const listeIdsVilles = villes.split(',');
      conditions.id_ville = {
        [Op.in]: listeIdsVilles
      };
    }

    if (specialites && specialites.trim() !== "" && specialites !== "undefined") {
      const listeIdsSpecs = specialites.split(',');
      conditions.id_specialite = {
        [Op.in]: listeIdsSpecs
      };
    }

    const artisans = await Artisan.findAll({
      where: conditions,
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

router.get('/api/specialite', async (req, res) => {
  try {
    const toutesLesSpecialite = await Specialite.findAll({
      order: [['specialite_name', 'ASC']] // Tri alphabétique automatique bien plus propre pour l'affichage
    });
    res.json(toutesLesSpecialite);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du chargement des specialites", details: error.message });
  }
});

router.get('/api/villes', async (req, res) => {
  try {
    const toutesLesVilles = await Ville.findAll({
      order: [['ville_name', 'ASC']] // Tri alphabétique automatique bien plus propre pour l'affichage
    });
    res.json(toutesLesVilles);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du chargement des villes", details: error.message });
  }
});

// Route pour récupérer un artisan précis par son ID
//router.get('/api/artisans/:id', async (req, res) => {
//  try {
//    const artisan = await Artisan.findByPk(req.params.id, {
//      include: [Ville, Categorie, Specialite]
//    });
//
//    if (!artisan) {
//      return res.status(404).json({ message: "Artisan introuvable" });
//    }
//
//    res.json(artisan);
//  } catch (error) {
//    res.status(500).json({ error: "Erreur serveur" });
//  }
//});

module.exports = router;