import './App.css';

function Home() {
  return (
    <div className="page-content">
      <h1>Welcome to Pattern Pulse</h1>
      <p>A memory game to test and train your pattern recognition skills.</p>
      <div className="game-preview">
        <p>Start a new game or continue your progress.</p>
        <button className="start-game-btn">Start Game</button>
      </div>
    </div>
  );
}

export default Home;
