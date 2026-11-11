import React from 'react';
import { Heart, Sparkles, Smartphone, Crosshair, Flame, ChevronRight, History } from 'lucide-react';
import { SensiResult } from '../utils/sensiCalculator';

interface HomeScreenProps {
  onStartGenerator: () => void;
  lastResult: SensiResult | null;
  onViewLastResult: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGenerator,
  lastResult,
  onViewLastResult,
}) => {
  return (
    <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-6 sm:py-8 flex flex-col gap-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#161219]/90 to-[#0b0a0e]/95 border border-[#FF2E7E]/30 p-6 sm:p-8 glow-love-border">
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#FF2E7E]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-4">
          <div className="px-3 py-1 rounded-full bg-[#FF2E7E]/15 border border-[#FF2E7E]/30 text-[#FF2E7E] text-xs font-bold tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EDICÃO ESPECIAL 2026</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          A Sensi Perfeita Para Subir <span className="text-[#FF2E7E] text-glow">Capa</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
          Calibrada de acordo com a taxa de toque do seu celular e o estilo dos maiores pro players de Free Fire.
        </p>

        {/* CTA Principal */}
        <div className="mt-8">
          <button
            onClick={onStartGenerator}
            type="button"
            className="w-full h-15 rounded-2xl bg-gradient-to-r from-[#FF2E7E] via-[#ff3b86] to-[#e61767] hover:from-[#ff458c] hover:to-[#ff1970] text-white font-extrabold text-lg flex items-center justify-center gap-3 glow-love active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#FF2E7E]/25"
          >
            <Crosshair className="w-6 h-6 animate-pulse" />
            <span>Gerar Sensi Agora</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Card de última sensi gerada se houver */}
        {lastResult && (
          <div className="mt-5 pt-5 border-t border-white/10">
            <button
              onClick={onViewLastResult}
              type="button"
              className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-[#FF2E7E]/10 border border-white/10 hover:border-[#FF2E7E]/40 flex items-center justify-between text-left transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FF2E7E]/20 flex items-center justify-center text-[#FF2E7E]">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                    Última Sensi Salva
                  </div>
                  <div className="text-sm font-bold text-white">
                    {lastResult.deviceName} • {lastResult.playerName}
                  </div>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#FF2E7E] flex items-center gap-1">
                Ver Sensi
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Grid de Benefícios / Destaques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF2E7E]/30 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#FF2E7E]/15 flex items-center justify-center text-[#FF2E7E] mb-2.5">
            <Smartphone className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-white">Todas as Marcas</h2>
          <p className="text-xs text-slate-400 mt-1">
            Samsung, iPhone, Xiaomi, Moto, Poco, Realme e mais de 20 fabricantes.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF2E7E]/30 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#FF2E7E]/15 flex items-center justify-center text-[#FF2E7E] mb-2.5">
            <Flame className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-white">Pro Players</h2>
          <p className="text-xs text-slate-400 mt-1">
            Nobru, Bak, Cerol, Apelapato e outros mitos do Free Fire.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF2E7E]/30 transition-colors">
          <div className="w-8 h-8 rounded-xl bg-[#FF2E7E]/15 flex items-center justify-center text-[#FF2E7E] mb-2.5">
            <Heart className="w-4 h-4 text-[#FF2E7E] fill-[#FF2E7E]" />
          </div>
          <h2 className="text-sm font-bold text-white">DPI & Botão</h2>
          <p className="text-xs text-slate-400 mt-1">
            Tamanho ideal do botão de tiro e DPI seguro para não reiniciar o celular.
          </p>
        </div>
      </div>

      {/* Dica do dia */}
      <div className="p-4 rounded-2xl bg-[#FF2E7E]/10 border border-[#FF2E7E]/25 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#FF2E7E] shrink-0 mt-0.5" />
        <p className="text-xs text-slate-200 leading-relaxed">
          <strong className="text-white font-bold">Dica de mestre:</strong> O mesmo aparelho com o mesmo jogador sempre gera a mesma sensi consistente, calibrada sob medida para sua taxa de amostragem de toque.
        </p>
      </div>
    </div>
  );
};
