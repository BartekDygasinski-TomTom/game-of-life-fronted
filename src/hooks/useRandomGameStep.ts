import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import axios from "axios";
import { NewRandomGameStateDto } from "../types/NewRandomGameState";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useRandomGameStep = (input: NewRandomGameStateDto) => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    async function randomGameState() {
      try {
        const response = await axios.post<GameState>(
          `${apiBaseUrl}/gamestates/random`,
          input
        );
        setGameState(response.data);
      } catch (error) {
        console.error("Error during asking for random game state");
      }

      randomGameState();
    }
  }, []);

  return gameState;
};
