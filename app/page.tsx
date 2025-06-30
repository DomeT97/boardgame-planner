"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [games, setGames] = useState<string[]>([]);
  const [newGame, setNewGame] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const storedGames = localStorage.getItem("games");
    const storedDate = localStorage.getItem("gameNight");
    if (storedGames) setGames(JSON.parse(storedGames));
    if (storedDate) setSelectedDate(new Date(storedDate));
  }, []);

  useEffect(() => {
    localStorage.setItem("games", JSON.stringify(games));
  }, [games]);

  useEffect(() => {
    if (selectedDate) {
      localStorage.setItem("gameNight", selectedDate.toISOString());
    }
  }, [selectedDate]);

  const addGame = () => {
    if (newGame.trim()) {
      setGames([...games, newGame.trim()]);
      setNewGame("");
    }
  };

  const clearAll = () => {
    setGames([]);
    setSelectedDate(null);
    localStorage.clear();
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🎲 Board Game Planner</h1>

      <button onClick={clearAll} style={{ marginBottom: 10 }}>
        🗑️ Alles löschen
      </button>

      <div>
        <h2>🧩 Spiele-Sammlung</h2>
        <input
          value={newGame}
          onChange={(e) => setNewGame(e.target.value)}
          placeholder="Neues Spiel hinzufügen"
        />
        <button onClick={addGame}>➕ Hinzufügen</button>

        <ul>
          {games.map((game, idx) => (
            <li key={idx}>{game}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>📅 Spieleabend planen</h2>
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().substring(0, 10) : ""}
          onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
        />
        {selectedDate && (
          <p>
            Nächstes Spieleabend: {selectedDate.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

