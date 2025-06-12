'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const POINTS = {
    GOL: 3,
    ATURADA: 0.5,
    PENALTI: 1,
    FALTA: -1,
    ASSIST:1
};

export default function MatchStatsPage() {
    const [stats, setStats] = useState([]);

    useEffect(() => {

        const fetchMatchStats = async () => {
            const matchId = localStorage.getItem('currentMatchId');
            if (!matchId) {
                console.warn('No matchId found in localStorage.');
                return;
            }
            const q = query(collection(db, 'matchActions'), where('matchId', '==', matchId));
            const snapshot = await getDocs(q);
            const actions = snapshot.docs.map(doc => doc.data());

            const map = {};

            actions.forEach(({ playerId, playerName, avatar, action }) => {
                if (!map[playerId]) {
                    map[playerId] = {
                        name: playerName,
                        avatar: avatar || '👤',
                        score: 0,
                        counts: { GOL: 0, ATURADA: 0, PENALTI: 0, FALTA: 0 },
                    };
                }

                map[playerId].counts[action]++;
                map[playerId].score += POINTS[action] || 0;
            });

            const result = Object.entries(map).map(([id, data]) => ({
                id,
                ...data,
            }));

            result.sort((a, b) => b.score - a.score);

            setStats(result);
        };

        fetchMatchStats();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Estadístiques del Partit</h1>
            {stats.map(player => (
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
            <div className="flex flex-col gap-4 w-full max-w-xs">
                <a
                    href="/"
                    className="bg-black text-white text-center px-6 py-3 rounded hover:bg-gray-800 transition"
                >
                    Go Home
                </a>

            </div>
        </div>
    );
}
