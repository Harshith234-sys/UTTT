import { useState } from 'react';
import MiniBoard from './components/MiniBoard';
import { createInitialState, makeMove } from './game/gameLogic';
import './App.css';

function App() {
  const [game, setGame] = useState(createInitialState());

  function handleCellClick(boardIndex, cellIndex) {
    setGame((prevGame) => makeMove(prevGame, boardIndex, cellIndex));
  }

  return (
    <div className="game">
      <h1>Ultimate Tic-Tac-Toe</h1>

      <p>Current Player: {game.currentPlayer}</p>

      <div className="game-board">
        {game.boards.map((board, boardIndex) => (
          <MiniBoard
            key={boardIndex}
            board={board}
            boardIndex={boardIndex}
            onCellClick={handleCellClick}
            active={
              game.activeBoard === null ||
              game.activeBoard === boardIndex
            }
          />
        ))}
      </div>
    </div>
  );
}

export default App;