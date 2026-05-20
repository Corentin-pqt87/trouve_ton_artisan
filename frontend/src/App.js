// assets
import logo from './asset/img/Logo.png'

// css

//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// addon
import { Routes, Route, Link } from 'react-router-dom';

// pages jsx
import Batiment from './pages/batiment';
import Services from './pages/services';
import Fabrication from './pages/fabrication';
import Alimentation from './pages/alimentation';
import Accueil from './pages/accueil';
import Test from './pages/Test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <Link class="navbar-brand" to="/"><img src={logo} alt="Logo" width="30" height="24"/></Link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link class="nav-link" to="/batiment">Bâtiment</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/services">Services</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/fabrication">Fabrication</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/alimentation">Alimentation</Link>
                  </li>
                </ul>
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            </div>
          </nav>
        </div>        
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/batiment" element={<Batiment />} />
          <Route path="/services" element={<Services />} />
          <Route path="/fabrication" element={<Fabrication />} />
          <Route path="/alimentation" element={<Alimentation />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>

      <footer>

      </footer>
    </div>
  );
}

export default App;
