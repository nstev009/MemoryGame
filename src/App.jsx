import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AboutUs from './AboutUs'
import './App.css'
import logo from './assets/logo-main.png'
import Game from './Game'
import GameSettings from './gamesettings'
import Home from './Home'
import Instructions from './Instructions'

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="titleContainer">
          <div className="logo"><img src={logo} alt="Logo" /></div>
          <div className="title">Pattern Pulse</div>
        </div>
        
        <div className="content-container">
          <nav className="vertical-nav">
            <Link to="/" className="nav-button">Home</Link>
            <Link to="/instructions" className="nav-button">Instructions</Link>
            <Link to="/about" className="nav-button">About Us</Link>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/gamesettings" element={<GameSettings />} />
              <Route path="/game" element={<Game />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
