// src/App.js
import logo from './asset/img/Logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './style/main.css'

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
      {/* HEADER ----------------------------------------------------------------------------------------------------- */}
      <header className="App-header border-bottom py-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            
            {/* GAUCHE : LOGO */}
            <div className="col-12 col-md-4 logo-container">
              {/* Le clic sur le logo réinitialise la recherche */}
              <Link className="navbar-brand" to="/recherche" onClick={() => setTexteSaisi('')}>
                <img src={logo} alt="Logo" className='logo' />
              </Link>
            </div>

            {/* DROITE : RECHERCHE */}
            <div className="col-12 col-md-8 search-nav-container">
              
              {/* BAR DE RECHERCHE */}
              <div className="search-top">
                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                  <input 
                    className="form-control me-2 rounded-pill" 
                    type="search" 
                    placeholder="Rechercher un artisan..." 
                    aria-label="Search"
                    value={texteSaisi}
                    onChange={handleInputChange}
                  />
                </form>
              </div>

              {/* BOUTTON */}
              <div className="nav-bottom">
                <ul className="nav me-2">
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
              </div>

            </div>

          </div>
        </div>        
      </header>

      <main className='App-doby'>
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
