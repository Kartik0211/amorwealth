import { User } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-amorwealth-indigo text-pure-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-semibold">Amorwealth</h1>
      </div>
      <div className="flex items-center gap-4">
        <span>Hello, Guest</span>
        <User className="h-8 w-8" />
      </div>
    </header>
  );
}
