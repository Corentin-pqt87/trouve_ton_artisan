import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ArtisanDetail() {
  const { id } = useParams(); // Récupère l'id de l'artisan depuis l'URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/artisans`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des données.");
        return res.json();
      })
      .then((data) => {
        // Recherche de l'artisan spécifique dans la liste par son ID
        const trouve = data.find((a) => String(a.id_artisan) === String(id));
        if (!trouve) throw new Error("Artisan introuvable.");
        setArtisan(trouve);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id, API_URL]);

  if (loading) return <div className="container text-center my-5 text-light">Chargement du profil...</div>;
  if (error) return <div className="container text-center my-5 text-danger">Erreur : {error}</div>;
  if (!artisan) return null;

  return (
    <div className="ArtisanDetail container my-5">
      {/* Bouton retour */}
      <Link to={-1} className="btn mb-4 rounded-pill">
        Retour aux résultats
      </Link>

      {/* Grand bloc profil de l'artisan */}
      <div className=" w-100 p-4 " style={{ borderRadius: "25px"}}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <div>
              <h1 className="card-title grey mb-1">{artisan.nom}</h1>
              <p className="fs-5 text-muted mb-2">
                {artisan.Ville?.ville_name || "Ville non spécifiée"}
              </p>
            </div>
            <span className="badge text-bg-success fs-5">{artisan.note}/5</span>
          </div>

          {/* Badges Catégories & Spécialités */}
          <div className="mb-4 d-flex gap-2 flex-wrap">
            <span className="badge rounded-pill text-bg-primary fs-6 px-3 py-2">
              {artisan.Specialite?.specialite_name}
            </span>
            <span className="badge rounded-pill text-bg-secondary fs-6 px-3 py-2">
              {artisan.Categorie?.categorie_name}
            </span>
          </div>

          <hr />

          {/* Description complète */}
          <div className="my-4">
            <h4 className="grey mb-3">À propos de cet artisan</h4>
            <p className="card-text fs-5 " style={{ whiteSpace: "pre-line" }}>
              {artisan.a_propos || "Aucune description fournie pour le moment."}
            </p>
          </div>

          <hr />

          {/* Liens de contact */}
          <div className="mt-4 d-flex gap-3 flex-wrap">
            {artisan.email && artisan.email.trim() !== "" && (
              <a className="btn btn-primary px-4" href={`mailto:${artisan.email}`}>
                Contacter par Email
              </a>
            )}
            {artisan.site_web && artisan.site_web.trim() !== "" && (
              <a 
                className="btn btn-outline-primary px-4" 
                href={artisan.site_web} 
                target="_blank" 
                rel="noreferrer"
              >
                Visiter le site Web
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}