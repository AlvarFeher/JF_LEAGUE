'use client';

import { useState,useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddNewPlayer() {
  const [playerName, setPlayerName] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);


    // Confetti animation effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Hide confetti after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    // Validation: check if name is empty
    if (playerName.trim() === '') {
      setMessage("Titu, dóna-li un nom no?");
      setShowMessage(true);
      
    }else{
try {
      // Add to Firebase
      await addDoc(collection(db, 'players'), {
        name: playerName
      });

      // Show success message
      setMessage('Jugador afegit amb èxit!');
      setShowMessage(true);
      setShowConfetti(true);
      setPlayerName('');
    } catch (error) {
      console.error('Error adding player:', error);
      setMessage("No s'ha pogut afegir el jugador.");
      setShowMessage(true);
    }
    }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(60)].map((_, i) => {
            const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400'];
            const sizes = ['w-2 h-2', 'w-3 h-3', 'w-4 h-4'];
            const animations = ['animate-bounce', 'animate-pulse', 'animate-spin'];
            
            return (
              <div
                key={i}
                className={`absolute rounded-full ${colors[Math.floor(Math.random() * colors.length)]} ${sizes[Math.floor(Math.random() * sizes.length)]} ${animations[Math.floor(Math.random() * animations.length)]}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  opacity: 0.8,
                }}
              />
            );
          })}
        </div>
      )}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md relative">
        <h1 className="text-2xl font-bold mb-4 text-center">Nou Convidat!</h1>

        {/* Message popup */}
        {showMessage && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-md w-full max-w-sm z-10">
            <div className="flex justify-between items-center">
              <p className="text-sm">{message}</p>
              <button
                onClick={() => setShowMessage(false)}
                className="ml-4 text-lg font-bold text-yellow-800 hover:text-red-600"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Add Player
          </button>
        </form>
      </div>
    </div>
  );
}
