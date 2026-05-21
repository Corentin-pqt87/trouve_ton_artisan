import React from 'react';
import { Link } from 'react-router-dom';

import '../style/NotFound.css';

export default function NotFound() {
    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center NotFound">
            <div className="text-center">
                <h1>404</h1>
                <p>Page non trouvée</p>
                <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
            </div>
        </div>
    )
}