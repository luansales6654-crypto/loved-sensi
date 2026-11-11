import React from 'react';
import { Heart, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
  showLogout?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, showLogout = true }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#050507]/85 backdrop-blur-md border-b border-[#FF2E7E]/20">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF2E7E] to-[#cc1b5e] flex items-center justify-center glow-love-sm shrink-0">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-white">
                LOVED <span className="text-[#FF2E7E]">SENSI</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right action: Sair */}
        {showLogout && onLogout && (
          <button
            onClick={onLogout}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-[#FF2E7E]/15 border border-white/10 hover:border-[#FF2E7E]/40 active:scale-95 transition-all"
            title="Sair do aplicativo"
            aria-label="Sair do aplicativo"
          >
            <LogOut className="w-3.5 h-3.5 text-[#FF2E7E]" />
            <span>Sair</span>
          </button>
        )}
      </div>
    </header>
  );
};
