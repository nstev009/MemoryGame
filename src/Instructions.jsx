import './instructions.css';

function Instructions() {
  return (
    <div className="page-content">
      <h1>How to Play</h1>
      <div className="instructions-container">
        <section>
          <h2>Game Rules</h2>
          <p>Pattern Pulse is a memory game that tests your ability to recognize and remember patterns.</p>
          <ol>
            <li>Pay attention to the pattern displayed on screen</li>
            <li>Memorize the sequence in the limited time provided</li>
            <li>Reproduce the pattern from memory</li>
            <li>Each successful round increases difficulty</li>
          </ol>
        </section>
        <section>
          <h2>Controls</h2>
          <p>Use your mouse or touchscreen to interact with the pattern elements.</p>
        </section>
        <section>
          <h2>Scoring</h2>
          <p>Points are awarded based on:</p>
          <ul>
            <li>Accuracy of pattern reproduction</li>
            <li>Speed of completion</li>
            <li>Difficulty level</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Instructions;
