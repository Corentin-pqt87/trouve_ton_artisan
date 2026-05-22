import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';

function Recherche() {
  const [searchParams] = useSearchParams();

  const categorieId = searchParams.get('categorie');
  const rechercheNavbar = searchParams.get('q') || '';

  // table artisan
  const [artisans, setArtisans] = useState([]);
  // table ville
  const [villes, setVilles] = useState([]); 
  //const [rechercheTexte, setRechercheTexte] = useState('');
  const [villesSelectionnees, setVillesSelectionnees] = useState([]);

  // affiche toute les villes de la table ville pour les recherches a cocher
  useEffect(() => {
    fetch('http://localhost:5000/api/villes')
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des villes");
        return res.json();
      })
      .then(data => setVilles(data)) // Injecte directement le résultat de la BDD (Lyon, Valence, etc.)
      .catch(err => console.error("Erreur récupération villes :", err));
  }, []);





  // filtre avec les categorie des artisans
  useEffect(() => {
    let queryParams = new URLSearchParams();
    
    if (categorieId) queryParams.append('id_categorie', categorieId);

    if (rechercheNavbar) queryParams.append('nom', rechercheNavbar);
    
    // si un/des ville(s) est/sont coché(s)
    if (villesSelectionnees.length > 0) {
      queryParams.append('villes', villesSelectionnees.join(','));
    }

    fetch(`http://localhost:5000/api/artisans?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => setArtisans(data))
      .catch(err => console.error("Erreur récupération artisans :", err));
  }, [categorieId, rechercheNavbar, villesSelectionnees]);

  // case a cocher
  const handleVilleChange = (idVille) => {
    if (villesSelectionnees.includes(idVille)) {
      setVillesSelectionnees(villesSelectionnees.filter(id => id !== idVille));
    } else {
      setVillesSelectionnees([...villesSelectionnees, idVille]);
    }
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        
        {/* PARTIE GAUCHE : zone de recherche (1/4) */}
        <div className="col-md-3 recherche border-end border-light-subtle pe-3">
          <h4 className="mb-3 text-secondary">Filtres de recherche</h4>
          
          

          {/* Recherche par Villes : case a cocher pour les villes */}
          <div className="mb-4">
            <label className="form-label fw-bold">Filtrer par Ville</label>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Ajout d'un scrollbar si la BDD contient énormément de villes */}
              {villes.length === 0 ? (
                <p className="text-muted small">Chargement des villes disponibles...</p>
              ) : (
                villes.map(ville => (
                  <div className="form-check mb-2" key={ville.id_ville}> {/* Utilisation de la clé primaire de votre table SQL */}
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`ville-${ville.id_ville}`}
                      checked={villesSelectionnees.includes(ville.id_ville)}
                      onChange={() => handleVilleChange(ville.id_ville)}
                    />
                    <label className="form-check-label" htmlFor={`ville-${ville.id_ville}`}>
                      {ville.ville_name} {/* Le nom de la ville provenant de MySQL */}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* PARTIE DROITE : resultat de la recherche (3/4) */}
        <div className="col-md-9 resultat ps-4">
          <h3 className="mb-4 text-primary">
            {artisans.length} Artisan(s) correspondant(s)
          </h3>
          
          {artisans.length === 0 ? (
            <div className="alert alert-info">Aucun artisan ne correspond à vos critères.</div>
          ) : (
            <div className="row row-cols-1 row-cols-lg-3 g-4">
              {artisans.map(artisan => (
                <div className="col d-flex justify-content-center" key={artisan.id_artisan}>
                  <ArtisanCard artisan={artisan} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Recherche;