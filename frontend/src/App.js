// src/App.js
import logo from './asset/img/Logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Accueil from './pages/accueil';
import Recherche from "./pages/recherche";
import Test from './pages/Test';
import NotFound from './pages/NotFound';

function App() {
  const [texteSaisi, setTexteSaisi] = useState('');
  // changer URL
  const navigate = useNavigate(); 

  // envois du form a l'api
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // redirire la recherche
    navigate(`/recherche?q=${encodeURIComponent(texteSaisi)}`);
  };

  // recherche en temps reel
  const handleInputChange = (e) => {
    const valeur = e.target.value;
    setTexteSaisi(valeur);
    // redirige l'url
    navigate(`/recherche?q=${encodeURIComponent(valeur)}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              {/* logo = nouvelle recherche */}
              <Link className="navbar-brand" to="/recherche" onClick={() => setTexteSaisi('')}>
                <img src={logo} alt="Logo" width="30" height="24"/>
              </Link>
              
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="#navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {/* recherche avec des categories predefinie */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/recherche?categorie=2" onClick={() => setTexteSaisi('')}>Bâtiment</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recherche?categorie=4" onClick={() => setTexteSaisi('')}>Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recherche?categorie=3" onClick={() => setTexteSaisi('')}>Fabrication</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/recherche?categorie=1" onClick={() => setTexteSaisi('')}>Alimentation</Link>
                  </li>
                </ul>
                
                {/* bare de recherche */}
                <form className="d-flex w-50" role="search" onSubmit={handleSearchSubmit}>
                  <input 
                    className="form-control me-5" 
                    type="search" 
                    placeholder="Rechercher un artisan..." 
                    aria-label="Search"
                    value={texteSaisi}
                    onChange={handleInputChange} // Déclenche le filtrage au fil de la saisie
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>        
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>

      </footer>
    </div>
  );
}

export default App;
