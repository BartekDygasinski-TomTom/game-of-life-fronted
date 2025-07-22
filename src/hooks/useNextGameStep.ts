import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useNextGameStep = (input: GameState) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    async function newGameStep() {
      try {
        const response = await axios.post<GameState>(
          `${apiBaseUrl}/gamestates/next`,
          input
        );
        setGameState(response.data);
      } catch (error) {
        console.error("Error during asking for next game step");
      }

      newGameStep();
    }
  }, []);

  return gameState;
};
