import { Suspense } from 'react';
import SelectPlayersPage from './SelectPlayersPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Carregant...</div>}>
      <SelectPlayersPage />
    </Suspense>
  );
}
