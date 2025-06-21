import './Home.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo-main.png'

function Home() {
  const [expanding, setExpanding] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setExpanding(true);
    setTimeout(() => {
      setFadingOut(true);
      setTimeout(() =>{
      navigate('/game');
      }, 400);
    }, 1200); 
  };

  return (
    <div className="page-content">
      <h1>Welcome to Pattern Pulse!</h1>
      <p>A memory game to test and train your pattern recognition skills.</p>
      <div className="game-preview">
        <p>Start a new game below.</p>
        <button className="start-game-btn" onClick={handleStart} disabled={expanding}>Start Game</button>
      </div>
      {expanding && (
        <div className={`logo-expand-overlay${fadingOut ? ' fade-out' : ''}`}>
          <img src={logo} alt="Logo" className={`logo-expand-img${fadingOut ? ' fade-out' : ''}`} />
        </div>
      )}
    </div>
  );
}

export default Home;
    