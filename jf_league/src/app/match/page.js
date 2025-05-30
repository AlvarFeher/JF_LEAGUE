'use client';

import { useEffect, useState } from 'react';

const actions = ['GOL', 'ATURADA', 'PENALTI', 'FALTA'];

export default function MatchPage() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [action, setAction] = useState(null);
  const [actor, setActor] = useState(null);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem('selectedPlayers') || '[]');
    setSelectedPlayers(players);
  }, []);

  const handleSubmit = () => {
    if (action && actor) {
      // You will later send this to Firebase
      console.log(`Action: ${action}, Player: ${actor}`);
      setAction(null);
      setActor(null);
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
            {selectedPlayers.map((player) => (
              <button
                key={player}
                className={`w-20 h-20 bg-gray-200 rounded ${
                  actor === player ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setActor(player)}
              >
                👤
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
