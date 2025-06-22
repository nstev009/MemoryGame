import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AboutUs from './AboutUs'
import './App.css'
import AboutUsIcon from './assets/about-us.png'
import HomeIcon from './assets/home.png'
import InstructionsIcon from './assets/instructions.png'
import logo from './assets/logo-main.png'
import Game from './Game'
import GameSettings from './gamesettings'
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
            <Link to="/" className="nav-button">
            Home <img src={HomeIcon} alt="Home Icon" className="nav-icon" />
            </Link>
            <Link to="/instructions" className="nav-button">
            Instructions <img src={InstructionsIcon} alt="Instructions Icon" className="nav-icon" />
            </Link>
            <Link to="/about" className="nav-button">
            About Us <img src={AboutUsIcon} alt="About Us Icon" className="about-us-icon" />
            </Link>
          </nav>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<GameSettings />} />
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
