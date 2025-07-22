import { useState } from "react";
import { GameState } from "../types/GameState";
import GameGrid from "../components/GameGrid";
import "./MainPage.css";

const MainPage = () => {
  const [currentState, setCurrentState] = useState<GameState | null>(null);
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState(20);

  return (
    <div className="game-page">
      <div className="game-board">
        {currentState ? (
          <GameGrid gameState={currentState} />
        ) : (
          <p>No board yet</p>
        )}
      </div>
      <div className="controls">
        <button>Next State</button>
        <button>Random State</button>

        <div className="slider-group">
          <label>
            Rows: {rows}
            <input
              type="range"
              min={5}
              max={100}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />
          </label>

          <label>
            Columns: {columns}
            <input
              type="range"
              min={5}
              max={100}
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
