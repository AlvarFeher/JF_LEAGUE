'use client';

import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function SelectPlayersPage() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(collection(db, 'players'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const togglePlayer = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const startMatch = () => {
    localStorage.setItem('selectedPlayers', JSON.stringify(selected));
    window.location.href = '/match';
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">JF LEAGUE</h1>
      <h2 className="text-lg mb-4">JORNADA 1</h2>
      <p className="font-semibold mb-2">SELECCIONA ALS JUGADORS</p>

      <div className="grid grid-cols-3 gap-4">
        {players.map((player) => (
          <button
            key={player.id}
            className={`w-20 h-20 bg-gray-300 rounded ${
              selected.includes(player.id) ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => togglePlayer(player.id)}
          >
            {player.avatar || '👤'}
            <div className="text-xs mt-1">{player.name}</div>
          </button>
        ))}
      </div>

      <button className="mt-6 bg-gray-300 p-2 rounded" onClick={startMatch}>
        COMENÇA LA SAMBA
      </button>
    </div>
  );
}
