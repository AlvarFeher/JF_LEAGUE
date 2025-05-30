'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const players = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];

export default function SelectPlayersPage() {
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const togglePlayer = (player) => {
    setSelected((prev) =>
      prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
    );
  };

  const startMatch = () => {
    localStorage.setItem('selectedPlayers', JSON.stringify(selected));
    router.push('/match');
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">JF LEAGUE</h1>
      <h2 className="text-lg mb-4">JORNADA 1</h2>
      <p className="font-semibold mb-2">SELECCIONA ALS JUGADORS</p>
      <div className="grid grid-cols-3 gap-4">
        {players.map((player) => (
          <button
            key={player}
            className={`w-20 h-20 bg-gray-300 rounded ${
              selected.includes(player) ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => togglePlayer(player)}
          >
            👤
          </button>
        ))}
      </div>
      <button className="mt-6 bg-gray-300 p-2 rounded" onClick={startMatch}>
        COMENÇA LA SAMBA
      </button>
    </div>
  );
}
