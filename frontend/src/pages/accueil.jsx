import React, {useState, useEffect} from 'react';

export default function Accueil() {
    return (
        <div className='Accueil'>
            <div id='header'></div>

            <h1>Trouve Ton Artisan</h1>

            <div className='explication'>
                <h2>Comment trouver mon artisan ?</h2>
                <ol>
                    <li>Choisir la catégorie d’artisanat dans le menu.</li>
                    <li>Choisir un artisan.</li>
                    <li>Le contacter via le formulaire de contact.</li>
                    <li>Une réponse sera apportée sous 48h.</li>
                </ol>
            </div>
        </div>
    );
}