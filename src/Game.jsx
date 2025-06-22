import { useCallback, useEffect, useState } from 'react'; // Add useCallback
import { useLocation } from 'react-router-dom';
import blackSquare from './assets/black.png';
import desert from './assets/desert.webp';
import ocean from './assets/ocean.jpg';
import rainforest from './assets/rainforest.webp';
import tundra from './assets/tundra.jpg';
import './game.css';

function Game() {
  const location = useLocation();
  const { theme, difficulty } = location.state || { theme: 'Desert', difficulty: 'Easy' };
  
  // State variables
  const [gameState, setGameState] = useState('preparing'); // preparing, showing, guessing, finished
  const [gameGrid, setGameGrid] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [blackIndices, setBlackIndices] = useState([]); // Store black squares indices
  
  const getGridSize = (difficulty) => {
    switch (difficulty) {
      case 'Easy (5x5)': return 5;
      case 'Medium (7x7)': return 7;
      case 'Hard (9x9)': return 9;
      default: return 5;
    }
  };

  const gridSize = getGridSize(difficulty);

  const getThemeImages = (theme) => {
    switch (theme) {
      case 'Rainforest': return rainforest;
      case 'Desert': return desert;
      case 'Ocean': return ocean;
      case 'Tundra': return tundra;
      default: return desert;
    }
  };

  // Setup game function
  const setupGame = useCallback(() => {
    const size = getGridSize(difficulty);
    const themeImage = getThemeImages(theme);
    
    const blackSquaresCount = size + 1;
    const totalSquares = size * size;

    // Create an array of indices for all squares
    const indices = Array.from({ length: totalSquares }, (_, i) => i);
    
    // Randomly select indices for black squares
    const blackSquareIndices = [];
    for (let i = 0; i < blackSquaresCount; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        blackSquareIndices.push(indices[randomIndex]);
        indices.splice(randomIndex, 1);
    }
    
    // Save black indices for later comparison
    setBlackIndices(blackSquareIndices);
    
    // Create the game grid with all theme images initially
    const cards = [];
    for (let i = 0; i < totalSquares; i++) {
        cards.push({
            id: i,
            img: themeImage,
            isBlack: blackSquareIndices.includes(i),
            isSelected: false,
            label: `card-${i}`
        });
    }
    
    setGameGrid(cards);
    setGameState('preparing');
    
    // Start game after a short delay
    setTimeout(() => {
        showPattern(cards, blackSquareIndices);
    }, 1000);
  }, [theme, difficulty]);

  // Show pattern function
  const showPattern = useCallback((cards, blackSquareIndices) => {
    setGameState('showing');
    
    // Create a new grid with black squares visible
    const newGrid = cards.map(card => ({
        ...card,
        img: card.isBlack ? blackSquare : getThemeImages(theme)
    }));
    
    setGameGrid(newGrid);
    
    // Hide pattern after 3 seconds
    setTimeout(() => {
        hidePattern(newGrid);
    }, 3000);
  }, [theme]);

  // Hide pattern function
  const hidePattern = useCallback((currentGrid) => {
    // Hide black squares
    const themeImage = getThemeImages(theme);
    
    const newGrid = currentGrid.map(card => ({
        ...card,
        img: themeImage
    }));
    
    setGameGrid(newGrid);
    setGameState('guessing');
  }, [theme]);

  useEffect(() => {
    setupGame();
    // Don't include gameGrid in dependencies to avoid infinite loops
  }, [setupGame]);
  // Handle card selection
  const handleCardClick = (id) => {
    if (gameState !== 'guessing') return;
    
    // Check if user has already selected the maximum number of cards
    if (userSelections.length >= blackIndices.length) {
      return; // Prevent selecting more cards than allowed
    }
    
    // Make a copy of the current grid
    const updatedGrid = [...gameGrid];
    const cardIndex = updatedGrid.findIndex(card => card.id === id);
    
    if (cardIndex === -1 || updatedGrid[cardIndex].isSelected) {
      return; // Card not found or already selected
    }
    
    // Update the selected card
    updatedGrid[cardIndex] = {
      ...updatedGrid[cardIndex],
      isSelected: true,
      img: blackSquare // Show as black when selected
    };

    const updatedSelections = [...userSelections, id];
    
    setGameGrid(updatedGrid);
    setUserSelections(updatedSelections);

    // Check if user has selected enough cards (immediately check)
    if (updatedSelections.length >= blackIndices.length) {
      setTimeout(() => {
        // Pass the updated selections to checkResults
        checkResults(updatedSelections);
      }, 500);
    }
  };
  
  const checkResults = (selections) => {
  // Calculate score based on correct selections
  const correctSelections = selections.filter(id => blackIndices.includes(id));
  const score = Math.round((correctSelections.length / blackIndices.length) * 100);
  
  // Update the grid to show feedback
  const updatedGrid = gameGrid.map(card => {
    // Correctly selected (user selected a black square) - GREEN
    if (selections.includes(card.id) && blackIndices.includes(card.id)) {
      return {
        ...card,
        isCorrect: true,
        isMissed: false,
        isWrong: false,
        img: 'green' // We'll handle this in the render method
      };
    }
    // Missed selection (black square that wasn't selected) - BLACK
    else if (!selections.includes(card.id) && blackIndices.includes(card.id)) {
      return {
        ...card,
        isCorrect: false,
        isMissed: true,
        isWrong: false,
        img: blackSquare
      };
    }
    // Wrong selection (selected a non-black square) - WHITE
    else if (selections.includes(card.id) && !blackIndices.includes(card.id)) {
      return {
        ...card,
        isCorrect: false,
        isMissed: false,
        isWrong: true,
        img: 'white' // We'll handle this in the render method
      };
    }
    // Regular square (not selected, not part of pattern) - return to theme image
    else {
      return {
        ...card,
        isCorrect: false,
        isMissed: false,
        isWrong: false,
        img: getThemeImages(theme)
      };
    }
  });
  
  setGameGrid(updatedGrid);
  setScore(score);
  setGameState('finished');
};

return (
  <div className="game-container">
    {/* Game Board Section - Left Side */}
    <div className="game-board-section">
      <div className={`game-board grid-${gridSize}`}>
        {gameGrid.map((card) => {
          // Determine card classes based on game state
          let cardClasses = 'card';
          
          if (gameState === 'guessing') {
            cardClasses += ' guessing';
          } else if (gameState !== 'guessing') {
            cardClasses += ' disabled';
          }
          
          if (gameState === 'finished') {
            cardClasses += ' finished';
            if (card.isCorrect) {
              cardClasses += ' correct';
            } else if (card.isMissed) {
              cardClasses += ' missed';
            } else if (card.isWrong) {
              cardClasses += ' wrong';
            } else {
              cardClasses += ' neutral';
            }
          }
          
          if (card.isSelected) {
            cardClasses += ' selected';
          }
          
          return (
            <div
              key={card.id}
              className={cardClasses}
              onClick={() => handleCardClick(card.id)}
            >
              {gameState !== 'finished' || (!card.isCorrect && !card.isMissed && !card.isWrong) ? (
                <img
                  src={card.img}
                  alt={card.label}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>

    {/* Game Info Section - Right Side */}
    <div className="game-info-section">
      <h2>Pattern Memory Game</h2>
      
      <div className="game-info">
        <p><strong>Theme:</strong> {theme}</p>
        <p><strong>Difficulty:</strong> {difficulty}</p>
        <p><strong>Grid Size:</strong> {gridSize}×{gridSize}</p>
        
        {gameState === 'preparing' && (
          <p className="status-message">Get ready...</p>
        )}
        {gameState === 'showing' && (
          <p className="status-message">Memorize the pattern!</p>
        )}
        {gameState === 'guessing' && (
          <p className="status-message">Select the squares that were black</p>
        )}
        {gameState === 'finished' && (
          <p className="status-message">Your score: {score}%</p>
        )}
      </div>

      {gameState === 'finished' && (
        <div className="game-results">
          <div className="legend">
            <h3>Results Legend:</h3>
            <div className="legend-item">
              <span className="legend-correct">Green:</span> Correctly selected
            </div>
            <div className="legend-item">
              <span className="legend-missed">Black:</span> Missed (should have selected)
            </div>
            <div className="legend-item">
              <span className="legend-wrong">White:</span> Incorrectly selected
            </div>
          </div>
          <button 
            className="play-again-btn"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  </div>
);
}

export default Game;