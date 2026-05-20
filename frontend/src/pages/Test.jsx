import React, { useState, useEffect } from 'react';

function Test() {
  // Égats pour stocker les données, les erreurs et le chargement
  const [artisans, setArtisans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const backendUrl = '/api/artisans';

    console.log("Tentative de connexion au backend...");

    fetch(backendUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données reçues avec succès :", data);
        setArtisans(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de connexion au serveur :", err);
        setError(err.message);
        setLoading(false);
      });
  }, []); // Le tableau vide [] indique que la requête s'exécute une seule fois au chargement de la page

  return (
    <div className="container mt-5">
      <div className="p-4 mb-4 bg-light rounded-3 shadow-sm">
        <h1 className="display-5 fw-bold text-primary">Page de Test Connexion</h1>
        <p className="col-md-8 fs-5">
          Ce composant vérifie si votre Front-End React communique correctement avec votre API Node.js et votre base MySQL `trouve_ton_artisan`.
        </p>
      </div>

      {/* 1. ÉTAT DE CHARGEMENT */}
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="mt-2 text-muted">Connexion à l'API en cours...</p>
        </div>
      )}

      {/* 2. ÉTAT D'ERREUR */}
      {error && (
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Échec de la connexion au Backend</h4>
          <p>L'application React n'a pas pu joindre votre serveur Node.js.</p>
          <hr />
          <p className="mb-0 font-monospace small">Détails de l'erreur : {error}</p>
        </div>
      )}

      {/* 3. AFFICHAGE DES DONNÉES SI SUCCÈS */}
      {!loading && !error && (
        <div>
          <div className="alert alert-success d-flex align-items-center" role="alert">
            <div>
              <strong>Connexion réussie !</strong> {artisans.length} artisan(s) trouvé(s) dans la base MySQL.
            </div>
          </div>

          <h2 className="mb-4 text-secondary">Liste des Artisans</h2>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {artisans.map((artisan) => (
              <div className="col" key={artisan.id_artisan}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold text-dark m-0">{artisan.nom}</h5>
                      <span className="badge bg-warning text-dark">{artisan.note}/5</span>
                    </div>

                    {/* Affichage des données interconnectées s'il y en a */}
                    <div className="mb-3">
                      {artisan.Specialite && (
                        <span className="badge bg-info text-dark me-1">{artisan.Specialite.specialite_name}</span>
                      )}
                      {artisan.Categorie && (
                        <span className="badge bg-secondary text-white me-1">{artisan.Categorie.categorie_name}</span>
                      )}
                      {artisan.Ville && (
                        <span className="badge bg-dark text-white">{artisan.Ville.ville_name}</span>
                      )}
                    </div>

                    <p className="card-text text-muted small text-truncate-3">{artisan.a_propos}</p>
                  </div>
                  <div className="card-footer bg-transparent border-top-0 pb-3">
                    <ul className="list-unstyled small mb-0 text-muted">
                      <li>{artisan.email}</li>
                      {artisan.site_web && (
                        <li className="text-truncate">
                          <a href={artisan.site_web} target="_blank" rel="noopener noreferrer">{artisan.site_web}</a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;