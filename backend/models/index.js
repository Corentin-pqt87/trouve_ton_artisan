const Artisan = require('./Artisan');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');
const Ville = require('./Ville');

// Artisan = Nom,Spécialité,Note,Ville,A propos,Email,Site Web,Catégorie,Top
Artisan.belongsTo(Ville, { foreignKey: 'id_ville' });
Artisan.belongsTo(Categorie, { foreignKey: 'id_categorie' });
Artisan.belongsTo(Specialite, { foreignKey: 'id_specialite' });

// une Ville a plusieurs Artisans
Ville.hasMany(Artisan, { foreignKey: 'id_ville' });
Categorie.hasMany(Artisan, { foreignKey: 'id_categorie' });
Specialite.hasMany(Artisan, { foreignKey: 'id_specialite' });

module.exports = {
  Artisan,
  Categorie,
  Specialite,
  Ville
};