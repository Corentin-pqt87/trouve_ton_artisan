// assets
import logo from './asset/img/Logo.png'

// css

//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// addon
//import { Routes, Route, Link } from 'react-router-dom';

// pages jsx

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img 
            src={logo}
            alt='Trouve Ton Artisan'
            class='img_logo'
          />
        </div>        
      </header>

      <body>

      </body>

      <footer>

      </footer>
    </div>
  );
}

export default App;
