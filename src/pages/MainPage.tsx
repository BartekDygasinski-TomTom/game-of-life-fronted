import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import GameGrid from "../components/GameGrid";
import "./MainPage.css";
import { useNextGameStep } from "../hooks/useNextGameStep";
import { useRandomGameStep } from "../hooks/useRandomGameStep";
import { Box, Button, Input, Label, Slider } from "tombac";

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
  const [alivePercentage, setAlivePercentage] = useState(0.3);

  const { getNextStep, loading, error } = useNextGameStep();
  const {
    getRandomState,
    loading: loadingRandom,
    error: errorRandom,
  } = useRandomGameStep();

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

  const handleRandomState = async () => {
    const random = await getRandomState({ rows, columns, alivePercentage });
    if (random) setCurrentState(random);
  };

  return (
    <div className="game-page">
      <div className="game-board">
        <GameGrid gameState={currentState} onCellClick={toggleCell} />
      </div>
      <div className="controls">
        <Button hoverEffect="anim-forward" onClick={handleNextStep}>
          Next State
        </Button>
        <Button hoverEffect="anim-forward" onClick={handleRandomState}>
          Random State
        </Button>

        <div className="slider-group">
          <Label>
            Live cell percentage: {(alivePercentage * 100).toFixed(0)}%
            <Slider
              marks={[
                { label: "0%", value: 0.0 },
                { label: "25%", value: 0.25 },
                { label: "50%", value: 0.5 },
                { label: "75%", value: 0.75 },
                { label: "100%", value: 1.0 },
              ]}
              max={1}
              min={0}
              onChange={(e) => setAlivePercentage(e)}
              value={alivePercentage}
              step={0.01}
            />
          </Label>

          <Label>
            Rows: {rows}
            <Box $alignItems="center" $display="flex">
              <Slider
                $w="300u"
                marks={[
                  { label: "5", value: 5 },
                  { label: "25", value: 25 },
                  { label: "50", value: 50 },
                  { label: "75", value: 75 },
                  { label: "100", value: 100 },
                ]}
                max={100}
                min={5}
                onChange={(e) => setRows(e)}
                value={rows}
              />

              <Input
                $ml="1sp"
                $w="55u"
                onChange={(event) => setRows(Number(event.target.value))}
                value={rows}
              />
            </Box>
          </Label>

          <Label>
            Columns: {columns}
            <Box $alignItems="center" $display="flex">
              <Slider
                $w="300u"
                marks={[
                  { label: "5", value: 5 },
                  { label: "25", value: 25 },
                  { label: "50", value: 50 },
                  { label: "75", value: 75 },
                  { label: "100", value: 100 },
                ]}
                max={100}
                min={5}
                onChange={(e) => setColumns(e)}
                value={columns}
              />

              <Input
                $ml="1sp"
                $w="55u"
                onChange={(event) => setColumns(Number(event.target.value))}
                value={columns}
              />
            </Box>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
