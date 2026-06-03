// src/App.js
import logo from './asset/img/Logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './style/main.css'
//import './style/auvergnerhonealpes.fr.css'

//page
import Accueil from './pages/accueil';
import Recherche from "./pages/recherche";
import Test from './pages/Test';
import NotFound from './pages/NotFound';
import ArtisanDetail from "./pages/ArtisanDetail";
//page legal pour footer
import Accessibilite from './pages/LEGAL/accessibilite'
import Cookies from './pages/LEGAL/cookies'
import Donne from './pages/LEGAL/donnees_personnelles'
import MentionsLegals from './pages/LEGAL/mentions_legals'

function App() {
  const [texteSaisi, setTexteSaisi] = useState('');
  // changer URL
  const navigate = useNavigate(); 
  const location = useLocation();

  // numéro de catégorie depuis l'URL 
  const queryParams = new URLSearchParams(location.search);
  const categorieActive = queryParams.get('categorie');

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
    <div className={`App ${categorieActive ? `bg-cat-${categorieActive}` : ''}`}>
      {/* HEADER ----------------------------------------------------------------------------------------------------- */}
      <header className="App-header border-bottom py-2 shadow-sm">
        <div className="container-fluid">
          <div className="row align-items-center">
            
            {/* GAUCHE : LOGO */}
            <div className="col-12 col-md-4 logo-container">
              {/* Le clic sur le logo réinitialise la recherche */}
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="Logo" className='logo' />
              </Link>
            </div>

            {/* DROITE : RECHERCHE */}
            <div className="col-12 col-md-8 search-nav-container">
              
              {/* BAR DE RECHERCHE */}
              <div className="search-top">
                <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
                  <input 
                    className="form-control me-2 " 
                    type="search" 
                    placeholder="Rechercher un artisan..." 
                    aria-label="Search"
                    value={texteSaisi}
                    onChange={handleInputChange}
                  />
                </form>
              </div>

              {/* BOUTTON */}
              <div className="nav-bottom ">
                <ul className="nav me-2 d-flex justify-content-around">
                  <li>
                    <Link className="nav-link rounded-pill" to="/recherche" onClick={() => setTexteSaisi('')}>Tout</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link rounded-pill" to="/recherche?categorie=2" onClick={() => setTexteSaisi('')}>Bâtiment</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link rounded-pill" to="/recherche?categorie=4" onClick={() => setTexteSaisi('')}>Services</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link rounded-pill" to="/recherche?categorie=3" onClick={() => setTexteSaisi('')}>Fabrication</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link rounded-pill" to="/recherche?categorie=1" onClick={() => setTexteSaisi('')}>Alimentation</Link>
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
          <Route path="/accessibilite" element={<Accessibilite />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/donnees_personnelles" element={<Donne />} />
          <Route path="/mentions_legals" element={<MentionsLegals />} />
          <Route path="/artisan/:id" element={<ArtisanDetail />} />

        </Routes>
      </main>

      <footer className="App-footer">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <ul className="list-unstyled">
                <li><Link className="nav-link" to="/accessibilite">Accessibilite</Link></li>
                <li><Link className="nav-link" to="/cookies">Cookies</Link></li>
                <li><Link className="nav-link" to="/donnees_personnelles">Données Personnelles</Link></li>
                <li><Link className="nav-link" to="/mentions_legals">Mentions Légales</Link></li>
              </ul>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <ul>
                <li>101 cours Charlemagne</li>
                <li>CS 20033</li>
                <li>69269 LYON CEDEX 02</li>
                <li>France</li>
                <li>+33 (0)4 26 73 40 00</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
