import { useCallback, useEffect, useState } from 'react'; // Add useCallback
import { useLocation } from 'react-router-dom';
import './Game.css';
import blackSquare from './assets/black.png';
import desert from './assets/desert.webp';
import ocean from './assets/ocean.jpg';
import rainforest from './assets/rainforest.webp';
import tundra from './assets/tundra.jpg';

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
      case 'Easy': return 5;
      case 'Medium': return 7;
      case 'Hard': return 9;
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

    // Check if user has selected enough cards
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
    <h2>Pattern Memory Game</h2>
    <div className="game-info">
      <p>Theme: {theme}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Game State: {gameState}</p>
      {gameState === 'showing' && <p>Memorize the pattern!</p>}
      {gameState === 'guessing' && <p>Select the squares that were black</p>}
      {gameState === 'finished' && <p>Your score: {score}%</p>}
    </div>
    
    <div className="game-board" style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      gap: '10px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {gameGrid.map((card) => (
        <div
          key={card.id}
          className={`card ${card.isSelected ? 'selected' : ''}`}
          onClick={() => handleCardClick(card.id)}
          style={{
            width: '100%',
            aspectRatio: '1',
            backgroundColor: gameState === 'finished' 
              ? (card.isCorrect 
                  ? 'green' 
                  : card.isMissed 
                    ? 'black' 
                    : card.isWrong 
                      ? 'white' 
                      : '#f0f0f0')
              : '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: gameState === 'guessing' ? 'pointer' : 'default'
          }}
        >
          {gameState !== 'finished' || (!card.isCorrect && !card.isMissed && !card.isWrong) ? (
            <img
              src={card.img}
              alt={card.label}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
    
    {gameState === 'finished' && (
      <div>
        <p>
          <span style={{ color: 'green', fontWeight: 'bold' }}>Green:</span> Correctly selected
          <br />
          <span style={{ color: 'black', fontWeight: 'bold' }}>Black:</span> Missed (should have selected)
          <br />
          <span style={{ color: 'gray', fontWeight: 'bold' }}>White:</span> Incorrectly selected
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px', padding: '10px 20px' }}
        >
          Play Again
        </button>
      </div>
    )}
  </div>
);
}

export default Game;