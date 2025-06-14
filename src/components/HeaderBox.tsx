import { ReactNode } from "react";
import { GiBee } from "react-icons/gi";
import { FaUser } from "react-icons/fa";

interface HeaderProps {
  children: ReactNode;
  onProfileClick?: () => void; 
}

export default function Header({ children, onProfileClick }: HeaderProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="flex bg-white justify-between items-center px-6 py-3 shadow-sm rounded-b-md">
        <h1 className="text-[var(--color-primary)] text-2xl font-bold flex items-center gap-2">
          ChatBee <GiBee className="text-3xl" />
        </h1>
        <div
          className="text-[var(--color-primary)] cursor-pointer hover:scale-110 transition"
          onClick={onProfileClick}
        >
          <FaUser className="text-xl" />
        </div>
      </header>
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
