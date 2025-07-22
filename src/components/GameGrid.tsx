import { GameState } from "../types/GameState";
import "./GameGrid.css"; // optional for styling

type GameGridProps = {
  gameState: GameState;
};

const GameGrid = ({ gameState }) => {
  if (!gameState || !gameState.matrix.length) {
    return <div>No game state available</div>;
  }

  return (
    <div className="game-grid">
      {gameState.matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="game-grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`game-grid-cell ${cell ? "alive" : "dead"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
