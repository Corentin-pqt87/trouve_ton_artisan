// src/pages/accueil.jsx
import React, { useState, useEffect } from 'react';
import ArtisanCard from '../components/ArtisanCard'; 

export default function Accueil() {
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        
        fetch('http://localhost:5000/api/artisans') 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des artisans');
                }
                return response.json();
            })
            .then((data) => {
                setArtisans(data); 
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="container text-center my-5 grey">Chargement des artisans...</div>;
    if (error) return <div className="container text-center my-5 text-danger">Erreur : {error}</div>;

    return (
        <div className='Accueil container my-4'>
            <h1>Trouve Ton Artisan</h1>

            <div className='explication mb-5'>
                <h2>Comment trouver mon artisan ?</h2>
                <ol>
                    <li>Choisir la catégorie d’artisanat dans le menu.</li>
                    <li>Choisir un artisan.</li>
                    <li>Le contacter via le formulaire de contact.</li>
                    <li>Une réponse sera apportée sous 48h.</li>
                </ol>
            </div>

            {/* TOP ARTISANS */}
            <div className='top-artisans-section'>
                <h2 className='mb-4 text-center grey'>Artisans du Mois</h2>
                
                <div className='row justify-content-center gap-4'>
                    {artisans
                        .filter(artisan => artisan.top_artisan === 1 || artisan.top_artisan === true)
                        .map(artisan => (
                            <div key={artisan.id} className="col-12 col-md-4 d-flex justify-content-center">
                                <ArtisanCard artisan={artisan} />
                            </div>
                        ))
                    }
                    {artisans.filter(artisan => artisan.top_artisan === 1 || artisan.top_artisan === true).length === 0 && (
                        <p className="text-center text-muted">Aucun top artisan à afficher pour le moment.</p>
                    )}
                </div>
            </div>
        </div>
    );
}