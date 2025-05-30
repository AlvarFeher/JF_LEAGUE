import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center h-full gap-8">
        <h1 className="text-3xl font-bold text-center">Welcome to JF League</h1>

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <a
            href="/select_players"
            className="bg-black text-white text-center px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Start Match
          </a>
          <a
            href="/stats"
            className="bg-black text-white text-center px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            View Stats
          </a>
        </div>
      </main>

      <footer className="row-start-3 text-center text-sm text-gray-600">
        Web oficial de gestió de jornades de la <b>JF League</b>
      </footer>
    </div>
  );
}

