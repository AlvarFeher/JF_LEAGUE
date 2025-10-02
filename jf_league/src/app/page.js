import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="w-full text-center mt-12 mb-8">
        <h1 className="text-3xl font-bold">Welcome to JF League</h1>
      </header>

      {/* Buttons */}
      <main className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="/select_players"
            className="bg-black text-white text-center px-6 py-3 text-lg rounded hover:bg-gray-800 transition"
          >
            Start Match
          </a>
          <a
            href="/stats"
            className="bg-black text-white text-center px-6 py-3 text-lg rounded hover:bg-gray-800 transition"
          >
            View Stats
          </a>
           <a
            href="/newPlayer"
            className="bg-black text-white text-center px-6 py-3 text-lg rounded hover:bg-gray-800 transition"
          >
            Add a New Player
          </a>
            <a
            href="/jaume"
            className="bg-black text-white text-center px-6 py-3 text-lg rounded hover:bg-gray-800 transition"
          >
            Jaume
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-600 mt-8">
        Web oficial de gestió de jornades de la <b>JF League</b>
      </footer>
    </div>
  );
}
