import { useEffect, useState } from "react";
import { GameState } from "../types/GameState";
import axios from "axios";
import { NewRandomGameStateDto } from "../types/NewRandomGameState";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useRandomGameStep = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRandomState = async (
    input: NewRandomGameStateDto
  ): Promise<GameState | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<GameState>(
        `${apiBaseUrl}/gamestates/random`,
        input
      );
      return response.data;
    } catch (err) {
      console.error("Error during asking for random game state", err);
      setError("Failed to fetch random game state.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getRandomState, loading, error };
};
