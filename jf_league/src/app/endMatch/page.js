'use client';

import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function EndMatchPage() {
  const [loading, setLoading] = useState(false);
  const [matchActions, setMatchActions] = useState([]);
  const router = useRouter();
  const gameId = 'Jornada 1'; // You could make this dynamic

  useEffect(() => {
    const loadActions = async () => {
      const q = query(collection(db, 'matchActions'), where('game', '==', gameId));
      const snapshot = await getDocs(q);
      const actions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchActions(actions);
    };

    loadActions();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Tag actions as finalized (optional)
      for (const action of matchActions) {
        const ref = doc(db, 'matchActions', action.id);
        await updateDoc(ref, { finalized: true }); // optional flag
      }
      //localStorage.clear();
      router.push('/matchStats'); // Or home
    } catch (err) {
      console.error('Error finalizing match:', err);
      alert('Error saving match.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      for (const action of matchActions) {
        await deleteDoc(doc(db, 'matchActions', action.id));
      }
      localStorage.clear();
      router.push('/');
    } catch (err) {
      console.error('Error cancelling match:', err);
      alert('Error cancelling match.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Finalitzar Jornada</h1>
      <p className="mb-6 text-center text-gray-600">
        Vols guardar les accions del partit o cancel·lar-les?
      </p>
 
      <div className="flex flex-col items-center gap-4 mt-6">
  <button
    onClick={handleSave}
    disabled={loading}
    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition text-base whitespace-nowrap"
  >
    <b>Guarda el partit, mestre</b>
  </button>
  <button
    onClick={handleCancel}
    disabled={loading}
    className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition text-base whitespace-nowrap"
  >
    <b>Cancel·la el partit</b>
  </button>

</div>

    </div>
  );
}
