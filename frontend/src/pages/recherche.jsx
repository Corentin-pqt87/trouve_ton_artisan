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
  const [villesSelectionnees, setVillesSelectionnees] = useState([]);

  // table specialité
  const [specialites, setSpecialites] = useState([]);
  const [specialitesSelectionnees, setSpecialitesSelectionnees] = useState([]);

  // Appel API pour avoir toute les villes
  useEffect(() => {
    fetch('http://localhost:5000/api/villes')
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des villes"); // <-- Corrigé ici ( " au lieu de \" )
        return res.json();
      })
      .then(data => setVilles(data))
      .catch(err => console.error("Erreur récupération villes :", err));
  }, []);

  // Appel API pour avoir toute les specialite
  useEffect(() => {
    fetch('http://localhost:5000/api/specialite')
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des spécialités"); // <-- Corrigé ici ( " au lieu de \" )
        return res.json();
      })
      .then(data => setSpecialites(data))
      .catch(err => console.error("Erreur récupération spécialités :", err));
  }, []);

  const handleVilleChange = (id_ville) => {
    if (villesSelectionnees.includes(id_ville)) {
      setVillesSelectionnees(villesSelectionnees.filter(id => id !== id_ville));
    } else {
      setVillesSelectionnees([...villesSelectionnees, id_ville]);
    }
  };

  // Gestion des spécialités
  const handleSpecialiteChange = (id_specialite) => {
    if (specialitesSelectionnees.includes(id_specialite)) {
      setSpecialitesSelectionnees(specialitesSelectionnees.filter(id => id !== id_specialite));
    } else {
      setSpecialitesSelectionnees([...specialitesSelectionnees, id_specialite]);
    }
  };

  // Filtre avec les critères
  useEffect(() => {
    let queryParams = new URLSearchParams();
    
    if (categorieId) queryParams.append('id_categorie', categorieId);
    if (rechercheNavbar) queryParams.append('nom', rechercheNavbar);
    
    if (villesSelectionnees.length > 0) {
      queryParams.append('villes', villesSelectionnees.join(','));
    }

    if (specialitesSelectionnees.length > 0) {
      queryParams.append('specialites', specialitesSelectionnees.join(','));
    }
    
    fetch(`http://localhost:5000/api/artisans?${queryParams.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du filtrage des artisans");
        return res.json();
      })
      .then(data => setArtisans(data))
      .catch(err => console.error("Erreur filtrage :", err));

  }, [categorieId, rechercheNavbar, villesSelectionnees, specialitesSelectionnees]);

  return (
    <div className="container-fluid my-4">
      <div className="row">
        
        {/* PARTIE GAUCHE : zone de recherche (1/4) */}
        <div className="col-md-3 recherche border-end border-light-subtle pe-3">
          <h4 className="mb-3 grey">Filtres de recherche</h4>
          
          

          {/* Recherche par Villes : case a cocher pour les villes */}
          <div className="mb-4 ville">
            <label className="form-label fw-bold grey">Filtrer par Ville</label>
            <div style={{ maxHeight: "300px", overflowY: "auto" }}> {/* Ajout d'un scrollbar*/}
              {villes.length === 0 ? (
                <p className="text-muted small grey">Chargement des villes disponibles...</p>
              ) : (
                villes.map(ville => (
                  <div className="form-check mb-2 grey" key={ville.id_ville}> {/* Utilisation de la clé primaire de votre table SQL */}
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`ville-${ville.id_ville}`}
                      checked={villesSelectionnees.includes(ville.id_ville)}
                      onChange={() => handleVilleChange(ville.id_ville)}
                    />
                    <label className="form-check-label" htmlFor={`ville-${ville.id_ville}`}>
                      {ville.ville_name}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="specialite mb-4">
            <h4 className="mb-3">Spécialités</h4>
            <div className="d-flex flex-column gap-2 overflow-y-auto" style={{maxHeight: "250px"}}>
              {specialites.length === 0 ? (
                <p className="text-muted small">Aucune spécialité disponible</p>
              ) : (
                specialites.map(spec => (
                  <div className="form-check" key={spec.id_specialite}>
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id={`specialite-${spec.id_specialite}`}
                      checked={specialitesSelectionnees.includes(spec.id_specialite)}
                      onChange={() => handleSpecialiteChange(spec.id_specialite)}
                    />
                    <label className="form-check-label" htmlFor={`specialite-${spec.id_specialite}`}>
                      {spec.specialite_name}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* PARTIE DROITE : resultat de la recherche (3/4) */}
        <div className="col-md-9 resultat ps-4">
          <h3 className="mb-4 grey">
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