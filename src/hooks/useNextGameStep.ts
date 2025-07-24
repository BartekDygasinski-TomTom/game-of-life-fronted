import { useState } from "react";
import { GameState } from "../types/GameState";
import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useNextGameStep = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNextStep = async (input: GameState): Promise<GameState | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<GameState>(
        `${apiBaseUrl}/gamestates/next`,
        input
      );
      return response.data;
    } catch (err) {
      console.error("Error during asking for next game step", err);
      setError("Failed to fetch next game state.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getNextStep, loading, error };
};
