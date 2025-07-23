import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import GameGrid from "../components/GameGrid";
import "./MainPage.css";
import { useNextGameStep } from "../hooks/useNextGameStep";

const createEmptyGameState = (
  rows: number,
  columns: number,
  previousState?: GameState
): GameState => {
  return {
    matrix: Array.from({ length: rows }, (_, rowIndex) =>
      Array.from({ length: columns }, (_, colIndex) => {
        return previousState?.matrix[rowIndex]?.[colIndex] ?? false;
      })
    ),
  };
};

const MainPage = () => {
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState(20);
  const [currentState, setCurrentState] = useState<GameState>(
    createEmptyGameState(rows, columns)
  );

  const { getNextStep, loading, error } = useNextGameStep();

  useEffect(() => {
    setCurrentState((prev) => createEmptyGameState(rows, columns, prev));
  }, [rows, columns]);

  const toggleCell = (row: number, col: number) => {
    setCurrentState((prev) => {
      if (!prev) return prev;

      const newMatrix = prev.matrix.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? !cell : cell
        )
      );

      return { matrix: newMatrix };
    });
  };

  const handleNextStep = async () => {
    const next = await getNextStep(currentState);
    if (next) setCurrentState(next);
  };

  return (
    <div className="game-page">
      <div className="game-board">
        <GameGrid gameState={currentState} onCellClick={toggleCell} />
      </div>
      <div className="controls">
        <button onClick={handleNextStep}>Next State</button>
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
