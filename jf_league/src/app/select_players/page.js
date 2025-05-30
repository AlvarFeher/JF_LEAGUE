'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SelectPlayersPage() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const team = searchParams.get('team') || 'Blanc'; 

  // Fetch all players
  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(collection(db, 'players'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const togglePlayer = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const nextStep = () => {
    localStorage.setItem(`team${team}`, JSON.stringify(selected));
    if (team === 'Blanc') {
      router.push('/select_players?team=Negre');
    } else {
      router.push('/match');
    }
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">JF LEAGUE</h1>
      <h2 className="text-lg mb-4">JORNADA 1</h2>
      <p className="font-semibold mb-2">Selecciona jugadors de l'equip {team}</p>

      <div className="grid grid-cols-3 gap-4">
        {players.map(player => (
          <button
            key={player.id}
            className={`w-20 h-24 bg-gray-300 rounded ${
              selected.includes(player.id) ? 'ring-4 ring-blue-500' : ''
            }`}
            onClick={() => togglePlayer(player.id)}
          >
            <div className="text-2xl">{player.avatar || '👤'}</div>
            <div className="text-xs mt-1 text-center">{player.name}</div>
          </button>
        ))}
      </div>

      <button className="mt-6 bg-black text-white px-4 py-2 rounded" onClick={nextStep}>
        {team === 'A' ? 'Next: Team Negre' : 'Start Match'}
      </button>
    </div>
  );
}
