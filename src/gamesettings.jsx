import React, { useState } from 'react';
import rainforest from './assets/rainforest.webp';
import ocean from './assets/ocean.jpg';
import desert from './assets/desert.webp';
import tundra from './assets/tundra.jpg';
import './gamesettings.css';

const themes = [
  { img: rainforest, label: 'Rainforest' },
  { img: desert, label: 'Desert' },
  { img: ocean, label: 'Ocean' },
  { img: tundra, label: 'Tundra' },
];
const difficulties = ['Easy', 'Medium', 'Hard'];
function Game() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  return (
   <div className="game-page">
      <h2>Game Settings</h2>
      <h2>Choose a Theme and Difficulty</h2>
      <div className='game-settings'>
        <div className='themes-container'>
          {themes.map((theme, idx) => (
            <div
              className={`theme-card${selectedTheme === idx ? ' selected' : ''}`}
              key={idx}
              onClick={() => setSelectedTheme(idx)}
            >
              <img src={theme.img} alt={theme.label + " Theme"} className='theme-image'/>
              <div className="theme-label">{theme.label}</div>
            </div>
          ))}
        </div>
        <div className='diff-container'>
          <h3>Difficulty Levels</h3>
          <div className="difficulty-options">
            {difficulties.map((level, idx) => (
              <button
                key={level}
                className={`difficulty-button${selectedDifficulty === idx ? ' selected' : ''}`}
                onClick={() => setSelectedDifficulty(idx)}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            className="start-game-btn"
            disabled={selectedTheme === null || selectedDifficulty === null}
            onClick={() => {
              if (selectedTheme !== null && selectedDifficulty !== null) {
                alert(`Starting game with ${themes[selectedTheme].label} theme and ${difficulties[selectedDifficulty]} difficulty!`);
              }
            }} >BEGIN</button>
        </div>
      </div>
    </div>
  );
}

export default Game;