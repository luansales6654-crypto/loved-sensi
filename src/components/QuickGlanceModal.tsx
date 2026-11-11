import React from 'react';
import { X, Smartphone, User, Sparkles } from 'lucide-react';
import { SensiResult } from '../utils/sensiCalculator';

interface QuickGlanceModalProps {
  result: SensiResult;
  onClose: () => void;
}

export const QuickGlanceModal: React.FC<QuickGlanceModalProps> = ({ result, onClose }) => {
  const { values, dpi, buttonSizePct } = result;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="glance-title"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <div className="max-w-2xl w-full mx-auto flex flex-col flex-1">
        {/* Top bar with Close */}
        <div className="flex items-center justify-between pb-4 border-b border-[#FF2E7E]/30 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E7E] animate-ping" />
            <h2 id="glance-title" className="text-lg font-black text-white uppercase tracking-wider">
              Tela de Consulta Rápida
            </h2>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#FF2E7E] text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar tela de consulta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device & Player Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 mb-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Smartphone className="w-4 h-4 text-[#FF2E7E]" />
            <span className="font-bold text-white">{result.deviceName}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-4 h-4 text-[#FF2E7E]" />
            <span className="font-bold text-white">{result.playerName}</span>
            <span className="text-[#FF2E7E]">({result.mode === 'high' ? 'ALTA' : 'BAIXA'})</span>
          </div>
        </div>

        {/* Warning banner */}
        <div className="p-2.5 rounded-xl bg-[#FF2E7E]/10 border border-[#FF2E7E]/30 text-center text-xs text-slate-200 mb-4">
          Abra o Free Fire &gt; <strong>Configurações &gt; Sensibilidade</strong> e digite os números abaixo:
        </div>

        {/* Large Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1">
          {/* Geral */}
          <div className="p-4 rounded-2xl bg-[#121118] border border-[#FF2E7E]/40 flex flex-col items-center justify-center text-center glow-love-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Geral
            </span>
            <span className="text-5xl sm:text-6xl font-black font-mono text-[#FF2E7E] tabular-nums mt-1 text-glow">
              {values.geral}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Câmera e Giro</span>
          </div>

          {/* Red Dot */}
          <div className="p-4 rounded-2xl bg-[#121118] border border-white/15 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ponto Vermelho
            </span>
            <span className="text-5xl sm:text-6xl font-black font-mono text-white tabular-nums mt-1">
              {values.redDot}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Mira sem Scope</span>
          </div>

          {/* Mira 2x */}
          <div className="p-4 rounded-2xl bg-[#121118] border border-white/15 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mira 2x
            </span>
            <span className="text-5xl sm:text-6xl font-black font-mono text-white tabular-nums mt-1">
              {values.mira2x}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Média Distância</span>
          </div>

          {/* Mira 4x */}
          <div className="p-4 rounded-2xl bg-[#121118] border border-white/15 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mira 4x
            </span>
            <span className="text-5xl sm:text-6xl font-black font-mono text-white tabular-nums mt-1">
              {values.mira4x}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Longa Distância</span>
          </div>

          {/* Mira AWM */}
          <div className="p-4 rounded-2xl bg-[#121118] border border-white/15 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Mira AWM
            </span>
            <span className="text-5xl sm:text-6xl font-black font-mono text-white tabular-nums mt-1">
              {values.miraAwm}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Sniper</span>
          </div>

          {/* Olhar Livre */}
          <div className="p-4 rounded-2xl bg-[#121118] border border-white/15 flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Olhar Livre
            </span>
            <span className="text-5xl sm:text-6xl font-black font-mono text-white tabular-nums mt-1">
              {values.olharLivre}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Visão 360</span>
          </div>
        </div>

        {/* DPI & Botão Strip */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="p-3.5 rounded-2xl bg-[#FF2E7E]/10 border border-[#FF2E7E]/30 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Botão de Tiro</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">{buttonSizePct}%</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FF2E7E]/10 border border-[#FF2E7E]/30 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase">DPI Recomendado</div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {dpi.isAdjustable ? dpi.value : 'Padrão iOS'}
            </div>
          </div>
        </div>

        {/* Back action */}
        <div className="pt-4">
          <button
            onClick={onClose}
            type="button"
            className="w-full h-13 rounded-2xl bg-[#FF2E7E] text-white font-bold text-base flex items-center justify-center gap-2 glow-love cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Voltar Para o Resumo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
