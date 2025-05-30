'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

const actions = ['GOL', 'ATURADA', 'PENALTI', 'FALTA'];

export default function MatchPage() {
  const [players, setPlayers] = useState([]);
  const [action, setAction] = useState(null);
  const [actor, setActor] = useState(null);
  const teamBlancIds = JSON.parse(localStorage.getItem('Blanc') || '[]');
  const teamNegreIds = JSON.parse(localStorage.getItem('Negre') || '[]');


  // Load full player data from Firestore
  useEffect(() => {
    const fetchSelectedPlayers = async () => {
      const selectedIds = JSON.parse(localStorage.getItem('selectedPlayers') || '[]');

      const promises = selectedIds.map(async (id) => {
        const docRef = doc(db, 'players', id);
        const snapshot = await getDoc(docRef);
        return { id, ...snapshot.data() };
      });


      const fullPlayers = await Promise.all(promises);
      setPlayers(fullPlayers);
    };

    fetchSelectedPlayers();
  }, []);

  useEffect(() => {
  const blanc = JSON.parse(localStorage.getItem('teamBlanc') || '[]');
  const negre = JSON.parse(localStorage.getItem('teamNegre') || '[]');

  console.log('Team Blanc:', blanc);
  console.log('Team Negre:', negre);
}, []);


  const handleSubmit = async () => {
    if (!action || !actor) return;

    try {
      await addDoc(collection(db, 'matchActions'), {
        action,
        playerId: actor.id,
        playerName: actor.name,
        avatar: actor.avatar || '👤',
        timestamp: serverTimestamp(),
        game: 'Jornada 1',
      });
      alert(`Action saved: ${action} by ${actor.name}`);
      setAction(null);
      setActor(null);
    } catch (err) {
      console.error('Error saving action:', err);
      alert('Error saving to Firestore');
    }
  };
  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">JF LEAGUE</h1>
      <h2 className="text-lg mb-4">JORNADA 1</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {actions.map((act) => (
          <button
            key={act}
            className={`w-28 h-16 bg-gray-300 rounded font-bold ${
              action === act ? 'ring-4 ring-green-500' : ''
            }`}
            onClick={() => setAction(act)}
          >
            {act}
          </button>
        ))}
      </div>

      {action && (
        <>
          <p className="mb-2">Selecciona jugador:</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {players.map((player) => (
              <button
                key={player.id}
                className={`w-20 h-24 bg-gray-200 rounded flex flex-col items-center justify-center ${
                  actor?.id === player.id ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setActor(player)}
              >
                <div className="text-2xl">{player.avatar || '👤'}</div>
                <div className="text-xs mt-1 text-center">{player.name}</div>
              </button>
            ))}
          </div>
        </>
      )}

      <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
}
