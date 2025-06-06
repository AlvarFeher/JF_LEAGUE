'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const POINTS = {
  GOL: 0.20,
  ATURADA: 3,
  PENALTI: 1,
  FALTA: -1,
  GUANYAR: 3,
  ASSIST:1
};

export default function StatsPage() {
  const [scores, setScores] = useState([]);

useEffect(() => {
  const fetchStats = async () => {

  const playerSnapshot = await getDocs(collection(db, 'players'));
  const allPlayers = playerSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));


  const statsMap = {};
  allPlayers.forEach(player => {
    statsMap[player.id] = {
      id: player.id,
      name: player.name,
      avatar: player.avatar || '👤',
      score: 0,
      counts: { GOL: 0, ATURADA: 0, PENALTI: 0, FALTA: 0, ASSIST: 0 },
      wins: 0,
    };
  });

  // Fetch all match actions
  const actionSnapshot = await getDocs(collection(db, 'matchActions'));
  const actions = actionSnapshot.docs.map(doc => doc.data());

  actions.forEach(({ playerId, action }) => {
    if (!statsMap[playerId]) return;
    if (statsMap[playerId].counts[action] === undefined) {
      statsMap[playerId].counts[action] = 0;
    }
    statsMap[playerId].counts[action]++;
    statsMap[playerId].score += POINTS[action] || 0;
  });

  const matchSnapshot = await getDocs(collection(db, 'matches'));
  const matches = matchSnapshot.docs.map(doc => doc.data());

  matches.forEach(match => {
    const winners = match.winner === 'Blanc' ? match.teamBlanc : match.teamNegre;
    winners.forEach(playerId => {
      if (statsMap[playerId]) {
        statsMap[playerId].wins++;
        statsMap[playerId].score += POINTS.GUANYAR; // +3 for each win
      }
    });
  });

  const result = Object.values(statsMap).sort((a, b) => b.score - a.score);
  setScores(result);
};


  fetchStats();
}, []);



  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Estadístiques Globals</h1>
      <p>(Lluis no falla)</p>
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
  GOL: {player.counts.GOL} | ATURADA: {player.counts.ATURADA} | PENALTI: {player.counts.PENALTI} | FALTA: {player.counts.FALTA} | ASSIST: {player.counts.ASSIST} | 🏆 WINS: {player.wins}
</div>
            </div>
          </div>
          <div className="text-lg font-bold">{player.score} pts</div>
        </div>
      ))}
    </div>
  );
}
