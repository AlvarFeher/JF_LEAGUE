'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const POINTS = {
  GOL: 3,
  ATURADA: 3,
  PENALTI: 1,
  FALTA: -1,
};

export default function StatsPage() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const q = query(collection(db, 'matchActions'), where('game', '==', 'Jornada 1'));
      const snapshot = await getDocs(q);
      const actions = snapshot.docs.map(doc => doc.data());

      const scoreMap = {};

      actions.forEach(({ playerId, playerName, avatar, action }) => {
        if (!scoreMap[playerId]) {
          scoreMap[playerId] = {
            name: playerName,
            avatar: avatar || '👤',
            score: 0,
            counts: { GOL: 0, ATURADA: 0, PENALTI: 0, FALTA: 0 },
          };
        }

        scoreMap[playerId].score += POINTS[action] || 0;
        scoreMap[playerId].counts[action] += 1;
      });

      // Convert to array and sort by score
      const scoreArray = Object.entries(scoreMap).map(([id, data]) => ({
        id,
        ...data,
      }));

      scoreArray.sort((a, b) => b.score - a.score);
      setScores(scoreArray);
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Jornada 1 – Estadístiques</h1>
      {scores.map(player => (
        <div
          key={player.id}
          className="flex items-center justify-between border-b py-2"
        >
          <div className="flex items-center gap-4">
            <div className="text-2xl">{player.avatar}</div>
            <div>
              <div className="font-semibold">{player.name}</div>
              <div className="text-xs text-gray-500">
                GOL: {player.counts.GOL} | ATURADA: {player.counts.ATURADA} | PENALTI: {player.counts.PENALTI} | FALTA: {player.counts.FALTA}
              </div>
            </div>
          </div>
          <div className="text-lg font-bold">{player.score} pts</div>
        </div>
      ))}
    </div>
  );
}
