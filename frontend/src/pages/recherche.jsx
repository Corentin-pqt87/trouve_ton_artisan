import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard from '../components/ArtisanCard';

function Recherche() {

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    fetch(`${API_URL}/api/villes`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des villes"); // <-- Corrigé ici ( " au lieu de \" )
        return res.json();
      })
      .then(data => setVilles(data))
      .catch(err => console.error("Erreur récupération villes :", err));
  }, [API_URL]);

  // Appel API pour avoir toute les specialite
  useEffect(() => {
    fetch(`${API_URL}/api/specialite`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors de la récupération des spécialités"); // <-- Corrigé ici ( " au lieu de \" )
        return res.json();
      })
      .then(data => setSpecialites(data))
      .catch(err => console.error("Erreur récupération spécialités :", err));
  }, [API_URL]);

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
    
    fetch(`${API_URL}/api/artisans?${queryParams.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error("Erreur lors du filtrage des artisans");
        return res.json();
      })
      .then(data => setArtisans(data))
      .catch(err => console.error("Erreur filtrage :", err));

  }, [categorieId, rechercheNavbar, villesSelectionnees, specialitesSelectionnees, API_URL]);

  // version mobil
  const RenderFiltresContent = ({ isMobile = false }) => (
    <>
      {/* Bloc Villes */}
      <div className="ville-bloc mb-4 filtre-section">
        <h4 className={`mb-3 ${isMobile ? 'text-dark fw-bold' : 'text-light'}`}>Villes</h4>
        <div className="d-flex flex-column gap-2 list-container">
          {villes.length === 0 ? (
            <p className="text-muted small">Aucune ville disponible</p>
          ) : (
            villes.map(ville => (
              <div className="form-check" key={ville.id_ville}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`${isMobile ? 'mob' : 'pc'}-ville-${ville.id_ville}`}
                  checked={villesSelectionnees.includes(ville.id_ville)}
                  onChange={() => handleVilleChange(ville.id_ville)}
                />
                <label className={`form-check-label ${isMobile ? 'text-dark' : 'text-light'}`} htmlFor={`${isMobile ? 'mob' : 'pc'}-ville-${ville.id_ville}`}>
                  {ville.ville_name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bloc Spécialités */}
      <div className="specialite-bloc filtre-section">
        <h4 className={`mb-3 ${isMobile ? 'text-dark fw-bold' : 'text-light'}`}>Spécialités</h4>
        <div className="d-flex flex-column gap-2 list-container">
          {specialites.length === 0 ? (
            <p className="text-muted small">Aucune spécialité disponible</p>
          ) : (
            specialites.map(spec => (
              <div className="form-check" key={spec.id_specialite}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  id={`${isMobile ? 'mob' : 'pc'}-spec-${spec.id_specialite}`}
                  checked={specialitesSelectionnees.includes(spec.id_specialite)}
                  onChange={() => handleSpecialiteChange(spec.id_specialite)}
                />
                <label className={`form-check-label ${isMobile ? 'text-dark' : 'text-light'}`} htmlFor={`${isMobile ? 'mob' : 'pc'}-spec-${spec.id_specialite}`}>
                  {spec.specialite_name}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="Recherche container py-4 py-md-5">
      
      {/* BOUTON BURGER */}
      <div className="d-md-none mb-3 text-start">
        <button 
          className="btn btn-burger-filtres d-inline-flex align-items-center gap-2" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#offcanvasFiltres" 
          aria-controls="offcanvasFiltres"
        >
          <span className="burger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="fw-bold">Filtrer les résultats</span>
          {(villesSelectionnees.length > 0 || specialitesSelectionnees.length > 0) && (
            <span className="badge bg-danger rounded-pill">
              {villesSelectionnees.length + specialitesSelectionnees.length}
            </span>
          )}
        </button>
      </div>

      {/* MENU BURGER Telephone*/}
      <div className="offcanvas offcanvas-start d-md-none custom-offcanvas" tabIndex="-1" id="offcanvasFiltres" aria-labelledby="offcanvasFiltresLabel">
        <div className="offcanvas-header border-b">
          <h5 className="offcanvas-title fw-bold text-dark" id="offcanvasFiltresLabel">Options de filtrage</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <RenderFiltresContent isMobile={true} />
        </div>
      </div>

      <div className="row g-4">
        
        {/* SIDEBAR PC */}
        <div className="col-12 col-md-3 d-none d-md-block filtre-section">
          <div className="pc-filtres-sidebar">
            <RenderFiltresContent isMobile={false} />
          </div>
        </div>

        {/* PARTIE DROITE : Résultats de recherche */}
        <div className="col-12 col-md-9 resultat-section bg-cat-${categorieId}">
          <h3 className="mb-4 text-md-start text-center">
            {artisans.length} Artisan(s) correspondant(s)
          </h3>
          
          {artisans.length === 0 ? (
            <div className="alert alert-info text-center text-md-start">
              Aucun artisan ne correspond à vos critères.
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5 justify-content-center justify-content-md-start">
              {artisans.map(artisan => (
                <div className="col d-flex justify-content-center mb-3" key={artisan.id_artisan}>
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