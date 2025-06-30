"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export default function BoardGamePlanner() {
  const [games, setGames] = useState<string[]>([]);
  const [newGame, setNewGame] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

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
    setSelectedDate(undefined);
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-900">🎲 Board Game Planner</h1>

      <div className="flex justify-center mb-6">
        <Button variant="destructive" onClick={clearAll}>🗑️ Alles löschen</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">🧩 Spiele-Sammlung</h2>
            <div className="flex gap-2 mb-4">
              <Input
                value={newGame}
                onChange={(e) => setNewGame(e.target.value)}
                placeholder="Neues Spiel hinzufügen"
              />
              <Button onClick={addGame}>➕ Hinzufügen</Button>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {games.map((game, idx) => (
                <li key={idx} className="text-gray-700">{game}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">📅 Spieleabend planen</h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow-sm"
            />
            {selectedDate && (
              <p className="mt-4 text-green-700 font-medium">
                Nächstes Spieleabend: {selectedDate.toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
