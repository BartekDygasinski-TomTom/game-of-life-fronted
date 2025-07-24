import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import GameGrid from "../components/GameGrid";
import "./MainPage.css";
import { useNextGameStep } from "../hooks/useNextGameStep";
import { useRandomGameStep } from "../hooks/useRandomGameStep";
import { Box, Button, Checkbox, Heading, Input, Label, Slider } from "tombac";

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
  const [rows, setRows] = useState(40);
  const [columns, setColumns] = useState(60);
  const [currentState, setCurrentState] = useState<GameState>(
    createEmptyGameState(rows, columns)
  );
  const [alivePercentage, setAlivePercentage] = useState(0.3);
  const [intervalInMilis, setIntervalInMilis] = useState(100);

  const { getNextStep, loading, error } = useNextGameStep();
  const {
    getRandomState,
    loading: loadingRandom,
    error: errorRandom,
  } = useRandomGameStep();
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setCurrentState((prev) => createEmptyGameState(rows, columns, prev));
  }, [rows, columns]);

  useEffect(() => {
    let interval: number | null = null;

    if (autoPlay) {
      interval = setInterval(() => {
        handleNextStep();
      }, intervalInMilis);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, currentState]);

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
        <Heading level={1}>Game of life</Heading>
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

          <Checkbox
            checked={autoPlay}
            label="Auto Play"
            variant="toggle"
            onChange={() => setAutoPlay((prev) => !prev)}
          />

          <Label>
            Interval rate: {intervalInMilis}
            <Box $alignItems="center" $display="flex">
              <Slider
                $w="300u"
                marks={[
                  { label: "50", value: 50 },
                  { label: "100", value: 100 },
                  { label: "150", value: 150 },
                  { label: "300", value: 300 },
                  { label: "500", value: 500 },
                ]}
                max={500}
                min={50}
                onChange={(e) => setIntervalInMilis(e)}
                value={intervalInMilis}
              />

              <Input
                $ml="1sp"
                $w="55u"
                onChange={(event) => setRows(Number(event.target.value))}
                value={intervalInMilis}
              />
            </Box>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
